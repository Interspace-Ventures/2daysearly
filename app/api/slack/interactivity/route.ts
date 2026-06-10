import { NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import type { WebClient } from '@slack/web-api';
import { db } from '@db/index';
import { submissions } from '@db/schema';
import {
  getSlackClient,
  verifySlackSignature,
  buildDecidedBlocks,
  buildWelcomeBlocks,
  resolveChannelId,
  CHATTER_CHANNEL,
} from '@/lib/slack';
import { sendInviteEmail } from '@/server/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // Raw body is required for Slack signature verification.
  const rawBody = await req.text();
  const tsHeader = req.headers.get('x-slack-request-timestamp');
  const sigHeader = req.headers.get('x-slack-signature');
  const valid = verifySlackSignature(rawBody, tsHeader, sigHeader);
  // TEMP DIAGNOSTIC: persists across dev-server restarts (remove after fix).
  try {
    const fs = await import('node:fs');
    const secret = process.env.SLACK_SIGNING_SECRET || '';
    const expected = tsHeader
      ? 'v0=' +
        (await import('node:crypto'))
          .createHmac('sha256', secret)
          .update(`v0:${tsHeader}:${rawBody}`)
          .digest('hex')
      : '(no-ts)';
    fs.appendFileSync(
      '/tmp/slack-debug.log',
      `${new Date().toISOString()} ARRIVED valid=${valid} secretLen=${secret.length} ` +
        `tsHeader=${tsHeader} bodyLen=${rawBody.length} ` +
        `expected=${expected.slice(0, 15)} received=${(sigHeader || '').slice(0, 15)}\n`,
    );
  } catch {}
  if (!valid) {
    return new NextResponse('invalid signature', { status: 401 });
  }

  const params = new URLSearchParams(rawBody);
  const payloadRaw = params.get('payload');
  if (!payloadRaw) return new NextResponse('ok');

  let payload: any;
  try {
    payload = JSON.parse(payloadRaw);
  } catch {
    return new NextResponse('bad payload', { status: 400 });
  }

  if (payload.type !== 'block_actions' || !payload.actions?.length) {
    return new NextResponse('ok');
  }

  const action = payload.actions[0];
  const actionId: string = action.action_id;
  const submissionId = Number(action.value);
  const deciderId: string = payload.user?.id || 'unknown';
  const deciderName: string = payload.user?.username || payload.user?.name || deciderId;

  if (!Number.isFinite(submissionId)) return new NextResponse('ok');
  if (actionId !== 'approve_submission' && actionId !== 'reject_submission') {
    return new NextResponse('ok');
  }

  const decision = actionId === 'approve_submission' ? 'approved' : 'rejected';

  // Atomic, idempotent decision: only the first click that finds the row still
  // 'pending' wins. Concurrent clicks update zero rows and exit without running
  // any side effects (welcome post / invite email).
  const updatedRows = await db
    .update(submissions)
    .set({ status: decision, decidedBy: deciderName, decidedAt: new Date() })
    .where(and(eq(submissions.id, submissionId), eq(submissions.status, 'pending')))
    .returning();

  if (updatedRows.length === 0) return new NextResponse('ok');
  const updated = updatedRows[0];

  // Slack operations are best-effort: if the bot token is missing/invalid the
  // decision is still recorded in the database.
  let slack: WebClient | null = null;
  try {
    slack = getSlackClient();
  } catch (err) {
    console.error('Slack client unavailable:', err);
  }

  // Update the original review message to reflect the decision.
  if (slack) {
    try {
      const channel = payload.channel?.id || updated.slackChannel;
      const ts = payload.message?.ts || updated.slackMessageTs;
      if (channel && ts) {
        await slack.chat.update({
          channel,
          ts,
          text: `Application ${decision}: ${updated.firstName} ${updated.lastName}`,
          blocks: buildDecidedBlocks(updated, decision, deciderId) as any,
        });
      }
    } catch (err) {
      console.error('Slack message update failed:', err);
    }
  }

  if (decision === 'approved') {
    // Welcome post in the chatter channel.
    if (slack) {
      try {
        const chatterChannel = await resolveChannelId(slack, CHATTER_CHANNEL);
        await slack.chat.postMessage({
          channel: chatterChannel,
          text: `Welcome ${updated.firstName} ${updated.lastName} to the community!`,
          blocks: buildWelcomeBlocks(updated) as any,
        });
      } catch (err) {
        console.error('Chatter post failed:', err);
      }
    }

    // Email the applicant their Slack invite link.
    try {
      const sent = await sendInviteEmail(updated);
      if (sent) {
        await db
          .update(submissions)
          .set({ inviteSentAt: new Date() })
          .where(eq(submissions.id, submissionId));
      }
    } catch (err) {
      console.error('Invite email failed:', err);
    }
  }

  return new NextResponse('ok');
}

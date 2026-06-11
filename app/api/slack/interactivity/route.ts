import { NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import type { WebClient } from '@slack/web-api';
import { db } from '@db/index';
import { submissions } from '@db/schema';
import {
  getSlackClient,
  verifySlackSignature,
  buildDecidedBlocks,
} from '@/lib/slack';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // Raw body is required for Slack signature verification.
  const rawBody = await req.text();
  const valid = verifySlackSignature(
    rawBody,
    req.headers.get('x-slack-request-timestamp'),
    req.headers.get('x-slack-signature'),
  );
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
  // any side effects (the welcome post).
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

  // The community welcome is intentionally NOT posted here. It fires later, when
  // the approved applicant actually joins the workspace (handled in
  // app/api/slack/events), so the post can @-mention their real Slack account.

  return new NextResponse('ok');
}

import { NextResponse } from 'next/server';
import { and, eq, isNull, sql } from 'drizzle-orm';
import type { WebClient } from '@slack/web-api';
import { db } from '@db/index';
import { submissions } from '@db/schema';
import {
  getSlackClient,
  verifySlackSignature,
  buildWelcomeBlocks,
  resolveChannelId,
  CHATTER_CHANNEL,
} from '@/lib/slack';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Slack Events API endpoint. Fires the community welcome when an approved
// applicant actually joins the workspace (`team_join`), so the post can
// @-mention their real Slack account. Configure this URL under the Slack app's
// "Event Subscriptions" and subscribe to the `team_join` event (requires the
// users:read.email scope so the event carries the joiner's email).
export async function POST(req: Request) {
  // Raw body is required for Slack signature verification.
  const rawBody = await req.text();

  let body: any;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return new NextResponse('bad payload', { status: 400 });
  }

  const valid = verifySlackSignature(
    rawBody,
    req.headers.get('x-slack-request-timestamp'),
    req.headers.get('x-slack-signature'),
  );
  if (!valid) {
    return new NextResponse('invalid signature', { status: 401 });
  }

  // One-time handshake Slack sends when the Request URL is (re)configured.
  if (body.type === 'url_verification') {
    return NextResponse.json({ challenge: body.challenge });
  }

  if (body.type !== 'event_callback' || body.event?.type !== 'team_join') {
    return new NextResponse('ok');
  }

  const joined = body.event.user;
  const slackUserId: string | undefined = joined?.id;
  const email: string | undefined = joined?.profile?.email;
  // Without the users:read.email scope Slack omits the email; nothing to match.
  if (!slackUserId || !email) return new NextResponse('ok');

  // Atomic claim: welcome each approved applicant exactly once, even if Slack
  // redelivers the event. Only the first call that finds a still-unwelcomed
  // approved row matching this email (case-insensitive) wins.
  const claimed = await db
    .update(submissions)
    .set({ welcomedAt: new Date() })
    .where(
      and(
        sql`lower(${submissions.email}) = ${email.toLowerCase()}`,
        eq(submissions.status, 'approved'),
        isNull(submissions.welcomedAt),
      ),
    )
    .returning();

  if (claimed.length === 0) return new NextResponse('ok');
  const s = claimed[0];

  let slack: WebClient | null = null;
  try {
    slack = getSlackClient();
  } catch (err) {
    console.error('Slack client unavailable:', err);
  }

  let posted = false;
  if (slack) {
    try {
      const chatter = await resolveChannelId(slack, CHATTER_CHANNEL);
      await slack.chat.postMessage({
        channel: chatter,
        text: `Welcome ${s.firstName} ${s.lastName} to the community!`,
        blocks: buildWelcomeBlocks(s, slackUserId) as any,
      });
      posted = true;
    } catch (err) {
      console.error('Welcome post failed:', err);
    }
  }

  // If the post didn't go out, release the claim so a Slack retry (or a later
  // manual retrigger) can welcome them instead of silently swallowing it.
  if (!posted) {
    await db
      .update(submissions)
      .set({ welcomedAt: null })
      .where(eq(submissions.id, s.id));
  }

  return new NextResponse('ok');
}

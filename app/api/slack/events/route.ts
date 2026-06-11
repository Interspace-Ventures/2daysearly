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
import {
  ensureReferralCode,
  recordReferralReward,
  buildReferralLink,
  REFERRAL_REWARD_CENTS,
} from '@/lib/referral';

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

  // Find the approved applicant for this joiner (case-insensitive email). The
  // join is itself the confirmation that earns the referrer their reward, so we
  // identify the row independently of the welcome-post dedupe below.
  const matched = await db.query.submissions.findFirst({
    where: and(
      sql`lower(${submissions.email}) = ${email.toLowerCase()}`,
      eq(submissions.status, 'approved'),
    ),
  });
  if (!matched) return new NextResponse('ok');

  // Record the $5 referral reward owed to whoever referred this now-joined
  // member. This runs on EVERY team_join delivery and is idempotent (UNIQUE
  // referredSubmissionId + on-conflict-do-nothing), so a Slack retry self-heals
  // a transient first-attempt failure instead of silently losing the reward.
  // It is deliberately NOT gated behind the welcome post: joining is the earn
  // condition, the welcome is just a side effect. No-op if not referred.
  try {
    await recordReferralReward(matched);
  } catch (err) {
    console.error('Referral reward record failed (will retry on redelivery):', err);
  }

  // Atomic claim: welcome each approved applicant exactly once, even if Slack
  // redelivers the event. Only the first call that finds a still-unwelcomed
  // approved row matching this email wins; later deliveries skip the welcome
  // and the one-time DM (the reward above has already been handled).
  const claimed = await db
    .update(submissions)
    .set({ welcomedAt: new Date() })
    .where(
      and(
        eq(submissions.id, matched.id),
        eq(submissions.status, 'approved'),
        isNull(submissions.welcomedAt),
      ),
    )
    .returning();

  if (claimed.length === 0) return new NextResponse('ok');
  const s = claimed[0];

  // Issue this member their own referral code now that they've joined (idempotent
  // — returns the existing code on a retry). Non-fatal if it fails.
  let referralCode: string | null = s.referralCode;
  try {
    referralCode = await ensureReferralCode(s.id);
  } catch (err) {
    console.error('Referral code issuance failed:', err);
  }

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
  // manual retrigger) can welcome them instead of silently swallowing it. Skip
  // the member-facing DM too so it fires with the welcome.
  if (!posted) {
    await db
      .update(submissions)
      .set({ welcomedAt: null })
      .where(eq(submissions.id, s.id));
    return new NextResponse('ok');
  }

  // DM the new member their own shareable referral link.
  if (slack && referralCode) {
    try {
      const dm = await resolveChannelId(slack, slackUserId);
      const link = buildReferralLink(referralCode);
      const dollars = (REFERRAL_REWARD_CENTS / 100).toFixed(0);
      await slack.chat.postMessage({
        channel: dm,
        text: `Your 2 Days Early referral link: ${link}`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `🎉 Welcome to *2 Days Early*, ${s.firstName}!\n\nKnow other Chimers or fintech operators who'd be a great fit? Share your personal invite link — you'll earn *$${dollars}* for each one we approve who joins this Slack.\n\n*Your link:*\n${link}`,
            },
          },
        ] as any,
      });
    } catch (err) {
      console.error('Referral DM failed:', err);
    }
  }

  return new NextResponse('ok');
}

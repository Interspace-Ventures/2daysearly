import { WebClient } from '@slack/web-api';
import crypto from 'crypto';
import type { Submission } from '@db/schema';

// Channel targets. Configurable via env, with sensible defaults.
export const PARTNERS_CHANNEL =
  process.env.SLACK_PARTNERS_CHANNEL || '#syndicate-partners';
export const CHATTER_CHANNEL =
  process.env.SLACK_CHATTER_CHANNEL || '#chatter';

export function getSlackClient(): WebClient {
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) throw new Error('SLACK_BOT_TOKEN is not set');
  return new WebClient(token);
}

export function isSlackConfigured(): boolean {
  return Boolean(process.env.SLACK_BOT_TOKEN && process.env.SLACK_SIGNING_SECRET);
}

// chat.postMessage with chat:write.public requires a channel *ID* for channels
// the bot hasn't joined; a "#name" only resolves if the bot is a member. To keep
// friendly "#name" config working, resolve names to IDs via conversations.list
// (needs channels:read / groups:read) and cache the result. Values that are
// already IDs (or anything not prefixed with "#") pass straight through.
const channelIdCache = new Map<string, string>();

export async function resolveChannelId(
  slack: WebClient,
  channel: string,
): Promise<string> {
  // A user ID (e.g. "U0123ABC") means "send a direct message": open (or reuse)
  // the IM channel and return its ID. Handy for testing without posting to a
  // shared channel. Requires the im:write scope.
  if (/^[UW][A-Z0-9]+$/.test(channel)) {
    const im = await slack.conversations.open({ users: channel });
    return (im.channel?.id as string) || channel;
  }
  if (!channel.startsWith('#')) return channel;
  const name = channel.slice(1).toLowerCase();
  if (channelIdCache.has(name)) return channelIdCache.get(name) as string;

  let cursor: string | undefined;
  do {
    const res = await slack.conversations.list({
      types: 'public_channel,private_channel',
      exclude_archived: true,
      limit: 200,
      cursor,
    });
    for (const c of res.channels || []) {
      if (c.name && c.id) channelIdCache.set(c.name.toLowerCase(), c.id);
    }
    if (channelIdCache.has(name)) return channelIdCache.get(name) as string;
    cursor = res.response_metadata?.next_cursor || undefined;
  } while (cursor);

  // Not found — return the raw value and let Slack surface the error.
  return channel;
}

// Slack mrkdwn fields cap at 3000 chars; keep individual answers well under.
function trunc(text: string, max = 700): string {
  const t = (text || '').trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t || '—';
}

export function buildSubmissionBlocks(s: Submission) {
  return [
    {
      type: 'header',
      text: { type: 'plain_text', text: `New application — ${s.firstName} ${s.lastName}` },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Email:*\n${s.email}` },
        { type: 'mrkdwn', text: `*Work:*\n${s.currentWork}` },
        { type: 'mrkdwn', text: `*Annual budget:*\n${s.annualBudget}` },
        { type: 'mrkdwn', text: `*LinkedIn:*\n<${s.linkedinUrl}|View profile>` },
      ],
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Fintech interests:*\n${(s.fintechInterests || []).join(', ') || '—'}`,
        },
        {
          type: 'mrkdwn',
          text: `*Experience:*\n${(s.experienceTags || []).join('; ') || '—'}`,
        },
      ],
    },
    { type: 'section', text: { type: 'mrkdwn', text: `*Referred by:* ${trunc(s.referralSource || '', 300)}` } },
    { type: 'divider' },
    { type: 'section', text: { type: 'mrkdwn', text: `*Can help others with:*\n${trunc(s.helpOffer)}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Wants to learn about:*\n${trunc(s.learnInterest)}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Outside of work:*\n${trunc(s.hobbies)}` } },
    {
      type: 'actions',
      block_id: `review_${s.id}`,
      elements: [
        {
          type: 'button',
          style: 'primary',
          text: { type: 'plain_text', text: 'Approve' },
          action_id: 'approve_submission',
          value: String(s.id),
        },
        {
          type: 'button',
          style: 'danger',
          text: { type: 'plain_text', text: 'Reject' },
          action_id: 'reject_submission',
          value: String(s.id),
        },
      ],
    },
  ];
}

// Replaces the action buttons with a context line recording the decision.
export function buildDecidedBlocks(
  s: Submission,
  decision: 'approved' | 'rejected',
  deciderId: string,
) {
  const blocks = buildSubmissionBlocks(s).filter((b) => b.type !== 'actions');
  const emoji = decision === 'approved' ? '✅' : '🚫';
  blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `${emoji} *${decision.toUpperCase()}* by <@${deciderId}>`,
      },
    ],
  } as any);
  return blocks;
}

export function buildWelcomeBlocks(s: Submission) {
  const interests = (s.fintechInterests || []).join(', ');
  const experience = (s.experienceTags || []).join('; ');
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `👋 Everyone welcome *${s.firstName} ${s.lastName}* to the community!`,
      },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Fintech interests:*\n${interests || '—'}` },
        { type: 'mrkdwn', text: `*Experience:*\n${experience || '—'}` },
      ],
    },
    { type: 'section', text: { type: 'mrkdwn', text: `*Can help others with:*\n${trunc(s.helpOffer, 500)}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Wants to learn about:*\n${trunc(s.learnInterest, 500)}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Outside of work:*\n${trunc(s.hobbies, 500)}` } },
  ];
}

// Verifies a Slack request signature (v0 scheme). Pass the RAW request body.
export function verifySlackSignature(
  rawBody: string,
  timestamp: string | null,
  signature: string | null,
): boolean {
  const secret = process.env.SLACK_SIGNING_SECRET;
  if (!secret || !timestamp || !signature) return false;

  // Reject requests older than 5 minutes (replay protection).
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 60 * 5) {
    return false;
  }

  const base = `v0:${timestamp}:${rawBody}`;
  const expected = `v0=${crypto
    .createHmac('sha256', secret)
    .update(base)
    .digest('hex')}`;

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

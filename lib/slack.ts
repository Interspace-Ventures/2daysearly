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

// Joins a list into natural language: "A", "A and B", "A, B, and C".
function naturalList(items: string[]): string {
  const xs = (items || []).map((x) => x.trim()).filter(Boolean);
  if (xs.length === 0) return '';
  if (xs.length === 1) return xs[0];
  if (xs.length === 2) return `${xs[0]} and ${xs[1]}`;
  return `${xs.slice(0, -1).join(', ')}, and ${xs[xs.length - 1]}`;
}

// Turns the "I have ..." experience options into clauses that read after "has".
function experienceClauses(tags: string[]): string {
  return naturalList((tags || []).map((t) => t.replace(/^I have\s+/i, '')));
}

// Trims freeform text and drops a single trailing period for clean inlining.
function inlineText(text: string | null): string {
  return (text || '').trim().replace(/\s*\.\s*$/, '');
}

// Builds the community welcome post as a warm, woven paragraph. When
// `slackUserId` is provided the new member is @-mentioned in the closing line;
// otherwise we fall back to their first name (e.g. when the post is made before
// they have joined the workspace).
export function buildWelcomeBlocks(s: Submission, slackUserId?: string | null) {
  const name = s.firstName;
  const mention = slackUserId ? `<@${slackUserId}>` : name;
  const experiences = experienceClauses(s.experienceTags || []);
  const interests = naturalList(s.fintechInterests || []);
  const help = inlineText(s.helpOffer);
  const learn = inlineText(s.learnInterest);
  const hobbies = inlineText(s.hobbies);

  const lines: string[] = [
    `👋 Please welcome *${s.firstName} ${s.lastName}* to the community!`,
    '',
  ];

  const intro: string[] = [];
  if (experiences) intro.push(`${name} has ${experiences}.`);
  if (interests) intro.push(`${name} is interested in ${interests}.`);
  if (intro.length) lines.push(intro.join(' '));

  if (help) lines.push(`• ${name} can help others with ${help}`);
  if (learn) lines.push(`• ${name} wants to learn about ${learn}`);

  lines.push('');
  const closing = hobbies
    ? `Outside of work, ${name} is doing ${hobbies}. Let's give a warm welcome to ${mention}! 🎉`
    : `Let's give a warm welcome to ${mention}! 🎉`;
  lines.push(closing);

  return [{ type: 'section', text: { type: 'mrkdwn', text: lines.join('\n') } }];
}

// Verifies a Slack request signature (v0 scheme). Pass the RAW request body.
export function verifySlackSignature(
  rawBody: string,
  timestamp: string | null,
  signature: string | null,
): boolean {
  const secret = process.env.SLACK_SIGNING_SECRET;
  if (!secret || !timestamp || !signature) {
    return false;
  }

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
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return false;
  }
  return true;
}

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
        { type: 'mrkdwn', text: `*Currently:*\n${s.currentWork}` },
        { type: 'mrkdwn', text: `*Into:*\n${interests || '—'}` },
        { type: 'mrkdwn', text: `*LinkedIn:*\n<${s.linkedinUrl}|Connect>` },
        { type: 'mrkdwn', text: `*Outside work:*\n${trunc(s.hobbies, 300)}` },
      ],
    },
    { type: 'section', text: { type: 'mrkdwn', text: `*Can help with:* ${trunc(s.helpOffer, 400)}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Wants to learn:* ${trunc(s.learnInterest, 400)}` } },
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

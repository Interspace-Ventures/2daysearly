import crypto from 'crypto';
import { and, count, eq, gte, inArray, isNull } from 'drizzle-orm';
import { db } from '@db/index';
import { submissions, referralRewards, type Submission } from '@db/schema';

// $5 per confirmed referral.
export const REFERRAL_REWARD_CENTS = 500;

// Soft anti-fraud ceiling: confirmed referrals beyond this many in a rolling
// 30-day window are withheld (status `flagged`) for manual review instead of
// auto-paying. The human approval + verified-join gate already filters fakes;
// this just stops a single account from quietly farming rewards at scale.
export const REFERRAL_MONTHLY_CAP = 25;

// Unambiguous alphabet (no 0/o/1/l/i) so codes are easy to read and share.
const CODE_ALPHABET = '23456789abcdefghjkmnpqrstuvwxyz';

// A short, unguessable, URL-safe referral code.
export function generateReferralCode(length = 8): string {
  const bytes = crypto.randomBytes(length);
  let out = '';
  for (let i = 0; i < length; i++) {
    out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  }
  return out;
}

// Canonical form of any inbound code: lowercase, alphanumeric only, bounded.
export function normalizeReferralCode(raw: string | null | undefined): string {
  return (raw || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 64);
}

// Public base URL for building shareable links. Falls back to the prod domain.
export function referralBaseUrl(): string {
  const base =
    process.env.PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://2daysearly.com';
  return base.replace(/\/+$/, '');
}

export function buildReferralLink(code: string): string {
  return `${referralBaseUrl()}/?ref=${encodeURIComponent(code)}`;
}

// Issue (once) a unique referral code for a member, retrying on the rare
// collision. Idempotent: if the row already has a code, return it unchanged.
export async function ensureReferralCode(submissionId: number): Promise<string | null> {
  const existing = await db.query.submissions.findFirst({
    where: eq(submissions.id, submissionId),
    columns: { referralCode: true },
  });
  if (existing?.referralCode) return existing.referralCode;

  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateReferralCode();
    try {
      // Only set it if still null, so concurrent callers don't clobber.
      const [updated] = await db
        .update(submissions)
        .set({ referralCode: code })
        .where(and(eq(submissions.id, submissionId), isNull(submissions.referralCode)))
        .returning({ referralCode: submissions.referralCode });
      // Another caller won the race and set a code first — fetch & return it.
      if (!updated) {
        const row = await db.query.submissions.findFirst({
          where: eq(submissions.id, submissionId),
          columns: { referralCode: true },
        });
        if (row?.referralCode) return row.referralCode;
      }
      if (updated?.referralCode) return updated.referralCode;
    } catch (err) {
      // Unique violation on a colliding code — try another.
      continue;
    }
  }
  return null;
}

// Create exactly one $5 reward for a confirmed referral, applying anti-fraud
// gates. Safe to call repeatedly (unique on referred_submission_id makes the
// insert a no-op after the first). Returns nothing; failures are swallowed by
// the caller's try/catch so they never break the welcome flow.
export async function recordReferralReward(referred: Submission): Promise<void> {
  const code = normalizeReferralCode(referred.referredByCode);
  if (!code) return;

  const referrer = await db.query.submissions.findFirst({
    where: eq(submissions.referralCode, code),
  });
  // Unknown code, or referrer is the same person (id or email) → no reward.
  if (!referrer) return;
  if (referrer.id === referred.id) return;
  if (referrer.email.trim().toLowerCase() === referred.email.trim().toLowerCase()) return;

  // Count this referrer's confirmed (earned or paid) rewards in the last 30
  // days; anything beyond the cap is withheld for manual review.
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const [{ recent }] = await db
    .select({ recent: count() })
    .from(referralRewards)
    .where(
      and(
        eq(referralRewards.referrerSubmissionId, referrer.id),
        gte(referralRewards.createdAt, since),
        inArray(referralRewards.status, ['earned', 'paid']),
      ),
    );
  const overCap = Number(recent) >= REFERRAL_MONTHLY_CAP;

  await db
    .insert(referralRewards)
    .values({
      referrerSubmissionId: referrer.id,
      referredSubmissionId: referred.id,
      amountCents: REFERRAL_REWARD_CENTS,
      status: overCap ? 'flagged' : 'earned',
      flagReason: overCap ? `Over monthly cap of ${REFERRAL_MONTHLY_CAP}` : null,
    })
    .onConflictDoNothing({ target: referralRewards.referredSubmissionId });
}

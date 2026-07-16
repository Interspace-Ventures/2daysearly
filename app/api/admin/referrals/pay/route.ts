import { NextResponse } from 'next/server';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from '@db/index';
import { referralRewards, submissions } from '@db/schema';
import { isAdminAuthed } from '@/lib/admin';
import { sendReferralPayout } from '@/lib/tremendous';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Statuses an admin may trigger a payout from. `flagged` is included so a
// reviewer can pay out a withheld reward after checking it; `failed` allows a
// retry. `processing` and `paid` are intentionally excluded.
const PAYABLE = ['earned', 'failed', 'flagged'];

export async function POST(req: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const ids: number[] = Array.isArray(body?.rewardIds)
    ? body.rewardIds.map((n: unknown) => Number(n)).filter(Number.isInteger)
    : Number.isInteger(Number(body?.rewardId))
      ? [Number(body.rewardId)]
      : [];

  if (ids.length === 0) {
    return NextResponse.json({ error: 'No rewards specified.' }, { status: 400 });
  }

  const results: { rewardId: number; ok: boolean; error?: string }[] = [];

  for (const id of ids) {
    // Atomically claim the reward so concurrent admin clicks can't double-pay.
    const [claimed] = await db
      .update(referralRewards)
      .set({ status: 'processing' })
      .where(and(eq(referralRewards.id, id), inArray(referralRewards.status, PAYABLE)))
      .returning();

    if (!claimed) {
      results.push({ rewardId: id, ok: false, error: 'Already paid or processing.' });
      continue;
    }

    // Once claimed (status='processing'), every exit path below MUST finalize
    // the status — otherwise a transient throw would strand the reward in
    // 'processing' and the money could never be paid or retried. The catch is
    // the backstop: any unexpected error flips it back to 'failed' (retryable).
    try {
      const referrer = await db.query.submissions.findFirst({
        where: eq(submissions.id, claimed.referrerSubmissionId),
      });
      if (!referrer) {
        await db
          .update(referralRewards)
          .set({ status: 'failed', flagReason: 'Referrer record missing.' })
          .where(eq(referralRewards.id, id));
        results.push({ rewardId: id, ok: false, error: 'Referrer record missing.' });
        continue;
      }

      const payout = await sendReferralPayout({
        email: referrer.email,
        name: `${referrer.firstName} ${referrer.lastName}`.trim(),
        amountCents: claimed.amountCents,
        externalId: `reward_${claimed.id}`,
      });

      if (payout.ok) {
        await db
          .update(referralRewards)
          .set({
            status: 'paid',
            provider: 'tremendous',
            providerPayoutId: payout.orderId || null,
            paidAt: new Date(),
            flagReason: null,
          })
          .where(eq(referralRewards.id, id));
        results.push({ rewardId: id, ok: true });
      } else {
        await db
          .update(referralRewards)
          .set({ status: 'failed', flagReason: payout.error || 'Payout failed.' })
          .where(eq(referralRewards.id, id));
        results.push({ rewardId: id, ok: false, error: payout.error });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected payout error.';
      // The Tremendous call carries external_id=reward_<id> for provider-side
      // idempotency, so a later retry of a 'failed' reward won't double-pay even
      // if the provider actually processed this attempt.
      await db
        .update(referralRewards)
        .set({ status: 'failed', flagReason: message })
        .where(eq(referralRewards.id, id))
        .catch((e) => console.error('Failed to finalize stuck reward', id, e));
      results.push({ rewardId: id, ok: false, error: message });
    }
  }

  const paid = results.filter((r) => r.ok).length;
  return NextResponse.json({ ok: paid > 0, paid, results });
}

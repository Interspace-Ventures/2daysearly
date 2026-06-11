'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type RewardRow = {
  id: number;
  referredName: string;
  referredEmail: string;
  amountCents: number;
  status: string;
  flagReason: string | null;
  providerPayoutId: string | null;
  createdAt: string | null;
  paidAt: string | null;
};

export type ReferrerGroup = {
  referrerId: number;
  referrerName: string;
  referrerEmail: string;
  referralCode: string | null;
  confirmed: number;
  earnedCents: number;
  paidCents: number;
  owedCents: number;
  flagged: number;
  rewards: RewardRow[];
};

const PAYABLE = new Set(['earned', 'failed', 'flagged']);

const STATUS_STYLE: Record<string, { bg: string; fg: string }> = {
  earned: { bg: '#2a2d3f', fg: '#9aa1b2' },
  paid: { bg: '#1dc677', fg: '#0c1a17' },
  failed: { bg: '#3a1d1d', fg: '#ffb4b4' },
  flagged: { bg: '#3a311d', fg: '#ffe08a' },
  processing: { bg: '#1d2a3a', fg: '#8ac4ff' },
  void: { bg: '#222', fg: '#777' },
};

function dollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.earned;
  return (
    <span
      className="sl-label inline-block px-2 py-1"
      style={{ background: s.bg, color: s.fg, fontSize: '0.58rem', border: '1px solid var(--carbon-border)' }}
    >
      {status}
    </span>
  );
}

export default function ReferralsPanel({
  groups,
  configured,
  sandbox,
}: {
  groups: ReferrerGroup[];
  configured: boolean;
  sandbox: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);

  async function pay(rewardIds: number[]) {
    if (rewardIds.length === 0) return;
    setError(null);
    setBusy((prev) => new Set([...prev, ...rewardIds]));
    try {
      const res = await fetch('/api/admin/referrals/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rewardIds }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || 'Payout failed.');
      } else {
        const failed = (data.results || []).filter((r: any) => !r.ok);
        if (failed.length) {
          setError(failed.map((f: any) => `#${f.rewardId}: ${f.error}`).join(' · '));
        }
      }
      router.refresh();
    } catch {
      setError('Network error during payout.');
    } finally {
      setBusy((prev) => {
        const next = new Set(prev);
        rewardIds.forEach((id) => next.delete(id));
        return next;
      });
    }
  }

  const totalOwed = groups.reduce((sum, g) => sum + g.owedCents, 0);
  const totalPaid = groups.reduce((sum, g) => sum + g.paidCents, 0);
  const totalConfirmed = groups.reduce((sum, g) => sum + g.confirmed, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-3 mt-10">
        <div>
          <h2 className="sl-display font-extrabold" style={{ color: 'var(--carbon-text)', fontSize: '1.4rem' }}>
            Referrals
          </h2>
          <p className="sl-label" style={{ color: 'var(--carbon-muted)', fontSize: '0.7rem' }}>
            {totalConfirmed} confirmed · {dollars(totalOwed)} owed · {dollars(totalPaid)} paid
          </p>
        </div>
        <span
          className="sl-label inline-block px-2 py-1"
          style={{
            background: configured ? (sandbox ? '#3a311d' : '#1dc677') : '#3a1d1d',
            color: configured ? (sandbox ? '#ffe08a' : '#0c1a17') : '#ffb4b4',
            fontSize: '0.58rem',
            border: '1px solid var(--carbon-border)',
          }}
        >
          {configured ? (sandbox ? 'Tremendous · sandbox' : 'Tremendous · live') : 'Tremendous not set up'}
        </span>
      </div>

      {error && (
        <p className="sl-body text-sm mb-3" style={{ color: '#ffb4b4' }}>
          {error}
        </p>
      )}

      {groups.length === 0 ? (
        <p className="sl-body" style={{ color: 'var(--carbon-muted)' }}>No confirmed referrals yet.</p>
      ) : (
        <div className="space-y-3">
          {groups.map((g) => {
            const payableIds = g.rewards.filter((r) => PAYABLE.has(r.status)).map((r) => r.id);
            const anyBusy = payableIds.some((id) => busy.has(id));
            return (
              <div
                key={g.referrerId}
                className="p-4"
                style={{ background: 'var(--carbon-card)', border: '2px solid var(--carbon-border)' }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="sl-display font-bold" style={{ color: 'var(--carbon-text)', fontSize: '1.05rem' }}>
                      {g.referrerName}
                    </p>
                    <a href={`mailto:${g.referrerEmail}`} className="sl-body text-sm" style={{ color: 'var(--mint)' }}>
                      {g.referrerEmail}
                    </a>
                    <p className="sl-label" style={{ color: 'var(--carbon-muted)', fontSize: '0.62rem', marginTop: '0.25rem' }}>
                      {g.confirmed} confirmed · earned {dollars(g.earnedCents)} · paid {dollars(g.paidCents)} · owed {dollars(g.owedCents)}
                      {g.flagged > 0 ? ` · ${g.flagged} flagged` : ''}
                    </p>
                  </div>
                  {payableIds.length > 0 && (
                    <button
                      type="button"
                      disabled={!configured || anyBusy}
                      onClick={() => pay(payableIds)}
                      className="sl-label font-bold"
                      style={{
                        padding: '0.5rem 0.9rem',
                        background: 'var(--mint)',
                        color: '#0c1a17',
                        border: '2px solid var(--carbon-border)',
                        opacity: !configured || anyBusy ? 0.5 : 1,
                        cursor: !configured || anyBusy ? 'not-allowed' : 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {anyBusy ? 'Paying…' : `Pay ${dollars(g.owedCents)}`}
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  {g.rewards.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between gap-3 py-1"
                      style={{ borderTop: '1px solid var(--carbon-border)' }}
                    >
                      <div className="sl-body text-sm" style={{ color: 'var(--carbon-muted)' }}>
                        <span style={{ color: 'var(--carbon-text)' }}>{r.referredName}</span>
                        {' · '}
                        {dollars(r.amountCents)}
                        {r.flagReason ? <span style={{ color: '#ffe08a' }}> · {r.flagReason}</span> : ''}
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={r.status} />
                        {PAYABLE.has(r.status) && (
                          <button
                            type="button"
                            disabled={!configured || busy.has(r.id)}
                            onClick={() => pay([r.id])}
                            className="sl-label"
                            style={{
                              padding: '0.3rem 0.6rem',
                              background: 'transparent',
                              color: 'var(--mint)',
                              border: '1px solid var(--carbon-border)',
                              opacity: !configured || busy.has(r.id) ? 0.5 : 1,
                              cursor: !configured || busy.has(r.id) ? 'not-allowed' : 'pointer',
                              fontSize: '0.58rem',
                            }}
                          >
                            {busy.has(r.id) ? '…' : 'Pay'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

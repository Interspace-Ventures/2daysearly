import { desc } from 'drizzle-orm';
import { db } from '@db/index';
import { submissions, referralRewards, type Submission } from '@db/schema';
import { isAdminAuthed } from '@/lib/admin';
import { isTremendousConfigured, tremendousIsProduction } from '@/lib/tremendous';
import AdminLogin from './login-form';
import LogoutButton from './logout-button';
import ReferralsPanel, { type ReferrerGroup, type RewardRow } from './referrals-panel';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const STATUS_STYLE: Record<string, { bg: string; fg: string }> = {
  pending: { bg: '#2a2d3f', fg: '#9aa1b2' },
  approved: { bg: '#1dc677', fg: '#0c1a17' },
  rejected: { bg: '#3a1d1d', fg: '#ffb4b4' },
  imported: { bg: '#1d2a3a', fg: '#9ac3ff' },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.pending;
  return (
    <span
      className="sl-label inline-block px-2 py-1"
      style={{ background: s.bg, color: s.fg, fontSize: '0.62rem', border: '1px solid var(--carbon-border)' }}
    >
      {status}
    </span>
  );
}

function Row({ s }: { s: Submission }) {
  return (
    <div
      className="p-4"
      style={{ background: 'var(--carbon-card)', border: '2px solid var(--carbon-border)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="sl-display font-bold" style={{ color: 'var(--carbon-text)', fontSize: '1.05rem' }}>
            {s.firstName} {s.lastName}
          </p>
          <a href={`mailto:${s.email}`} className="sl-body text-sm" style={{ color: 'var(--mint)' }}>
            {s.email}
          </a>
        </div>
        <StatusBadge status={s.status} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 sl-body text-sm" style={{ color: 'var(--carbon-muted)' }}>
        <span><strong style={{ color: 'var(--carbon-text)' }}>Work:</strong> {s.currentWork}</span>
        <span><strong style={{ color: 'var(--carbon-text)' }}>Budget:</strong> {s.annualBudget}</span>
        <span className="sm:col-span-2">
          <strong style={{ color: 'var(--carbon-text)' }}>Interests:</strong> {(s.fintechInterests || []).join(', ') || '—'}
        </span>
        <span>
          <strong style={{ color: 'var(--carbon-text)' }}>LinkedIn:</strong>{' '}
          <a href={s.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--mint)' }}>
            profile
          </a>
        </span>
        <span><strong style={{ color: 'var(--carbon-text)' }}>Applied:</strong> {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '—'}</span>
        {s.decidedBy && (
          <span className="sm:col-span-2">
            <strong style={{ color: 'var(--carbon-text)' }}>Decision by:</strong> {s.decidedBy}
            {s.welcomedAt ? ' · joined & welcomed' : ''}
          </span>
        )}
      </div>
    </div>
  );
}

export default async function AdminPage() {
  const authed = await isAdminAuthed();

  if (!authed) return <AdminLogin />;

  const allRows = await db.select().from(submissions).orderBy(desc(submissions.createdAt));
  // Imported historical records are kept for metrics only — they should not
  // appear in the live review queue or inflate the operational counts.
  const rows = allRows.filter((r) => r.status !== 'imported');
  const importedCount = allRows.length - rows.length;
  const counts = {
    total: rows.length,
    pending: rows.filter((r) => r.status === 'pending').length,
    approved: rows.filter((r) => r.status === 'approved').length,
    rejected: rows.filter((r) => r.status === 'rejected').length,
  };

  // Build the per-referrer referral summary.
  const rewards = await db.query.referralRewards.findMany({
    with: { referrer: true, referred: true },
    orderBy: desc(referralRewards.createdAt),
  });

  const groupMap = new Map<number, ReferrerGroup>();
  for (const r of rewards) {
    const referrer = r.referrer;
    const referred = r.referred;
    if (!referrer) continue;
    let g = groupMap.get(referrer.id);
    if (!g) {
      g = {
        referrerId: referrer.id,
        referrerName: `${referrer.firstName} ${referrer.lastName}`.trim(),
        referrerEmail: referrer.email,
        referralCode: referrer.referralCode,
        confirmed: 0,
        earnedCents: 0,
        paidCents: 0,
        owedCents: 0,
        flagged: 0,
        rewards: [],
      };
      groupMap.set(referrer.id, g);
    }
    g.confirmed += 1;
    if (r.status === 'paid') g.paidCents += r.amountCents;
    if (r.status === 'earned' || r.status === 'failed' || r.status === 'flagged') {
      g.earnedCents += r.amountCents;
      g.owedCents += r.amountCents;
    }
    if (r.status === 'flagged') g.flagged += 1;
    const row: RewardRow = {
      id: r.id,
      referredName: referred ? `${referred.firstName} ${referred.lastName}`.trim() : `#${r.referredSubmissionId}`,
      referredEmail: referred?.email || '',
      amountCents: r.amountCents,
      status: r.status,
      flagReason: r.flagReason,
      providerPayoutId: r.providerPayoutId,
      createdAt: r.createdAt ? r.createdAt.toISOString() : null,
      paidAt: r.paidAt ? r.paidAt.toISOString() : null,
    };
    g.rewards.push(row);
  }
  const groups = [...groupMap.values()].sort((a, b) => b.owedCents - a.owedCents);
  const tremendousConfigured = await isTremendousConfigured();

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--carbon-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: '880px' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="sl-display font-extrabold" style={{ color: 'var(--carbon-text)', fontSize: '1.7rem' }}>
              Applications
            </h1>
            <p className="sl-label" style={{ color: 'var(--carbon-muted)', fontSize: '0.7rem' }}>
              {counts.total} total · {counts.pending} pending · {counts.approved} approved · {counts.rejected} rejected
              {importedCount > 0 ? ` · ${importedCount} imported (historical, metrics only)` : ''}
            </p>
          </div>
          <LogoutButton />
        </div>

        {rows.length === 0 ? (
          <p className="sl-body" style={{ color: 'var(--carbon-muted)' }}>No applications yet.</p>
        ) : (
          <div className="space-y-3">
            {rows.map((s) => (
              <Row key={s.id} s={s} />
            ))}
          </div>
        )}

        <ReferralsPanel
          groups={groups}
          configured={tremendousConfigured}
          sandbox={!tremendousIsProduction()}
        />
      </div>
    </div>
  );
}

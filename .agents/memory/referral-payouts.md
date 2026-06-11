---
name: 2 Days Early referral rewards + Tremendous payouts
description: Durable design decisions for the referral program — when a reward is earned, idempotency/anti-fraud invariants, and how Tremendous payouts are wired.
---

# Referral rewards program

## A reward is earned ONLY on confirmed join, not on apply or approve
- One reward = the referred person was approved by a partner AND actually joined Slack with a verified email. Reward creation is hung off the existing atomic `welcomedAt` claim in the `team_join` handler, so it reuses the join confirmation as the anti-fraud gate.
- **Why:** the whole point is paying for real members, not applications; gating on the same verified-join event that the welcome uses means no separate trust check is needed.

## Idempotency / double-pay invariants (do not weaken)
- `referral_rewards.referredSubmissionId` is **UNIQUE** → a given joiner can generate at most one reward; reward insert uses on-conflict-do-nothing.
- Payout path claims atomically: `UPDATE referral_rewards SET status='processing' WHERE id=? AND status IN ('earned','failed','flagged') RETURNING *`. No row ⇒ already paid/processing, skip. Only after that does it call Tremendous.
- Tremendous order is sent with `external_id = reward_<id>` for provider-side idempotency, so even a retry won't double-pay.
- **Why:** three independent layers (DB unique, atomic claim, provider external_id) because money movement must never double-fire on concurrent admin clicks or Slack retries.

## Anti-fraud at reward creation
- Self-referral (referrer == referred, by id or email) is skipped. Unknown/invalid `referredByCode` is dropped at intake.
- Soft monthly cap `REFERRAL_MONTHLY_CAP = 25` confirmed in 30 days → new rewards created as `flagged` (withheld for manual review) rather than auto-payable. `REFERRAL_REWARD_CENTS = 500`.

## Payout recipient/amount are server-derived, never client-supplied
- `/api/admin/referrals/pay` accepts only reward IDs. Recipient email/name come from the stored referrer submission; amount from `amountCents`. The client can never redirect a payout or change the amount.
- Endpoint re-checks the admin cookie (`isAdminAuthed`) on every request before doing anything.

## Tremendous wiring
- Tremendous is a **connector_catalog** integration (`connector_catalog:tremendous`), not a standard connector — it has no config until the user runs `propose_setting_up`/`proposeIntegration`. There is no `getUncachableTremendousClient` snippet; `lib/tremendous.ts` fetches the API key from the Replit connectors proxy (`/api/v2/connection?include_secrets=true&connector_names=tremendous`) with a `TREMENDOUS_API_KEY` secret fallback.
- **Defaults to SANDBOX** (`testflight.tremendous.com/api/v2`); `TREMENDOUS_ENV=production` switches to `api.tremendous.com`. Recipient-choice payout needs a `TREMENDOUS_CAMPAIGN_ID`; funding source auto-detected (balance) unless `TREMENDOUS_FUNDING_SOURCE_ID` set.
- The exact connector `settings` field name for the key was unverified at build time (tried `api_key`/`apiKey`/`access_token`/`secret_key`) — confirm against the real connection after setup and trim.

# Threat Model

## Project Overview

2 Days Early is a public marketing site (Next.js App Router, React, TypeScript) served by a minimal custom Node `http` server (`server/index.ts`) on port 5000. It is no longer a purely static site: it has a Postgres database (Drizzle ORM), a native multi-step application form, a password-protected admin surface, Slack-driven application review, and a **referral rewards program that moves real money** via Tremendous payouts. These additions materially expand the attack surface beyond the original static brochure site.

## Assets

- **Applicant data (PII)** — submissions store names, emails, LinkedIn URLs, and free-text answers in Postgres. This data must not leak to unauthenticated users or through public endpoints.
- **Money movement (referral payouts)** — the highest-value asset. Each confirmed referral creates a $5 reward, paid out through Tremendous. The system must prevent unauthorized payouts, double-payment, payout to an attacker-controlled recipient, and fraudulent reward creation.
- **Admin access** — `/admin` and the admin-only payout API are gated by a single shared `ADMIN_PASSWORD`. Compromise grants both PII access and the ability to trigger payouts.
- **Slack workspace integrity** — the bot token can post messages and read user emails. Inbound Slack webhooks (interactivity, events) must be authenticated so attackers cannot forge approvals or join events.
- **Site integrity and brand trust** — visitors should see only intended content and outbound links; no script injection or content tampering.

## Trust Boundaries

- **Browser → Next.js server** — all public requests hit the custom server, which delegates to Next's handler. The browser is untrusted; form input and referral codes (`?ref=`) are attacker-controllable.
- **Slack → app webhooks** — `POST /api/slack/interactivity` (Approve/Reject) and `POST /api/slack/events` (`team_join`) are public endpoints. They are authenticated by HMAC signature verification using `SLACK_SIGNING_SECRET` over the raw request body, with a timestamp check to limit replay. Unsigned or stale requests must be rejected.
- **Admin auth boundary** — `/admin` and `/api/admin/*` require a session cookie (`tde_admin`) whose value is an unguessable SHA-256 derivation of `ADMIN_PASSWORD`, compared with a timing-safe equality check. The payout endpoint re-checks this on every request.
- **App → Tremendous** — payout credentials come from the Replit Tremendous connector (preferred) or a `TREMENDOUS_API_KEY` secret. All payout calls are server-only; credentials are never exposed to the client. The environment defaults to **sandbox** (`testflight.tremendous.com`) unless `TREMENDOUS_ENV=production` is set.
- **App → Slack** — outbound Block Kit messages built from stored submission data.

## Scan Anchors

- **Production entry points:** `server/index.ts`, `app/layout.tsx`, `app/page.tsx`, the App Router route handlers under `app/api/`.
- **Highest-risk production code (money + auth + inbound webhooks):**
  - `lib/tremendous.ts` (credential fetch, payout order creation)
  - `app/api/admin/referrals/pay/route.ts` (admin-gated payout trigger; atomic claim)
  - `lib/referral.ts` (reward creation, idempotency, self/dup/cap anti-fraud)
  - `app/api/slack/interactivity/route.ts` and `app/api/slack/events/route.ts` (signature verification, atomic state transitions)
  - `lib/slack.ts` (signature verification), `lib/admin.ts` (session token)
  - `app/api/submissions/route.ts` (referral-code validation, input validation)
- **Public surface:** the marketing site, `/api/submissions`, `/api/slack/*`, and `/admin` login. The admin list/payout actions are authenticated.
- **Out of scope unless proven reachable:** leftover template config, build artifacts, non-imported scaffolding.

## Threat Categories

### Spoofing

- **Forged Slack webhooks** — an attacker could try to fake an Approve action or a `team_join` event to trigger an approval or a payout-qualifying join. Mitigation: HMAC signature verification over the raw body with a timestamp window; reject anything unsigned/stale.
- **Referral attribution spoofing** — `?ref=CODE` is attacker-controlled. The intake route must validate the code maps to a real member and drop self-referral and unknown codes, so attribution cannot be forged onto an arbitrary member.
- **Admin impersonation** — the admin cookie must be derived from the secret and compared in constant time; no client-trusted "isAdmin" flags.

### Tampering

- **Payout recipient tampering** — the payout recipient email/name is taken from the stored referrer submission, never from client input on the pay request. The pay endpoint accepts only reward IDs, not amounts or recipients.
- **Reward amount tampering** — amounts are server-side constants (`amountCents` default 500); the client cannot set or change them.
- **DOM/outbound-link tampering** — client components must render trusted, hardcoded destinations only.

### Repudiation / Integrity of money movement

- **Double payment** — concurrent admin clicks or webhook retries must not pay twice. Mitigations: (1) `referredSubmissionId` is `UNIQUE`, so a join produces at most one reward; reward creation uses on-conflict-do-nothing; (2) the pay endpoint atomically claims a reward (`status` → `processing`) before calling Tremendous, so only one request can advance it; (3) Tremendous orders are sent with an `external_id` (`reward_<id>`) for provider-side idempotency.
- **Reward only on real confirmation** — a reward is created only when the referred person is approved by a partner AND actually joins Slack with a verified email (tied to the atomic `welcomedAt` claim). This is the core anti-fraud gate.
- **Soft cap** — more than `REFERRAL_MONTHLY_CAP` (25) confirmed referrals in 30 days marks new rewards `flagged` for manual review rather than auto-payable.

### Information Disclosure

- **PII exposure** — submission data is only rendered on the authenticated `/admin` page; no public endpoint returns it. Error responses must not leak stack traces, internal paths, or secrets.
- **Credential exposure** — Slack/admin/Tremendous secrets are server-only. The Tremendous API key must never reach the client; the connector proxy fetch happens server-side.

### Elevation of Privilege

- **Unauthenticated payout** — `/api/admin/referrals/pay` must reject requests without a valid admin cookie (return 401) before doing any work.
- **Custom server scope** — the Node server should not add privileged endpoints, file access, or request handling beyond Next's normal serving path.

## Required Security Guarantees

1. Every admin-only endpoint re-verifies the admin cookie server-side on each request.
2. All Slack inbound webhooks verify the HMAC signature over the raw body with a timestamp window.
3. Payout recipient and amount are derived server-side from stored data; the client supplies only reward IDs.
4. Reward creation and payout are idempotent (unique constraint + atomic claim + provider `external_id`).
5. Tremendous defaults to sandbox; going live requires an explicit `TREMENDOUS_ENV=production`.
6. No secret or PII is ever sent to the browser or included in error output.

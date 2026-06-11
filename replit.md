# 2 Days Early

## Overview

Marketing website for "2 Days Early", an operator-led investment syndicate (Chime alumni and fintech operators). It presents the syndicate's purpose, principles, portfolio companies, and partners, and lets interested operators apply through a **native multi-step join form** built into the site.

Applications are stored in Postgres and routed for review through Slack: each submission posts to a partners channel with Approve/Reject buttons. On approval, a welcome message is posted to a community channel and the review message updates with a reminder to invite the applicant into Slack — the reviewer pastes their email (shown on the message) into Slack's native "Invite people" dialog, which sends the official invite. A password-protected admin page lists all applications.

The site also runs a **referral rewards program**: existing members earn **$5** for each Chimer/operator they refer who is **approved AND joins Slack**. Each joined member gets their own `?ref=` link (DM'd on join); a confirmed referral creates one reward, which an admin pays out from the admin page through **Tremendous** (sandbox by default).

The design uses a neobrutalism aesthetic — bold type, sharp 2px borders, and offset drop shadows — built around a green ("mint") color palette on dark carbon surfaces.

## User Preferences

- **Communication style**: Simple, everyday language.
- **Typography**: Matching the Structured Liquidity framework's three-tier type system — Archivo for display/headings (heavy weights, tight -0.02em tracking, matches the rebranded calendar-grid wordmark), Outfit for body copy, and Space Mono (uppercase, loose tracking) for labels, nav links, and buttons. The display font is wired through the `--font-display` CSS variable (defined in `app/layout.tsx`), so swapping it only requires changing one place. Reusable `.sl-display` / `.sl-body` / `.sl-label` utility classes live in `app/globals.css`.
- **Design aesthetic**: Neobrutalism using a green (Chime-style) palette rather than bright primary colors.
- **Code architecture**: Clean, modular components with proper TypeScript typing.
- **Layout alignment**: Left-align to the card edge, right-align to the box-shadow edge for visual balance.
- **Responsive spacing**: Keep components close together while accounting for the box-shadow's visual footprint.
- **Section height**: Compact layout with reduced section padding.

## Architecture

### Stack

- **Framework**: Next.js 15 (App Router) with React 18 and TypeScript.
- **Styling**: Tailwind CSS 3 plus custom utilities in `app/globals.css` (fluid typography, responsive grids, neobrutalism helpers). Class composition via `clsx` and `tailwind-merge`.
- **Database**: Postgres via Drizzle ORM (`drizzle-orm` + `pg`). Schema in `db/schema.ts`, client in `db/index.ts`, config in `drizzle.config.ts`. Push schema changes with `npx drizzle-kit push`.
- **Forms**: A native multi-step form (`components/forms/join-form.tsx`) using `react-hook-form` + `zod` (shared schema in `lib/join-form.ts`). Opened via a global custom event from the nav/hero "JOIN" buttons (`lib/join-modal.ts`).
- **API**: Next.js route handlers (Node runtime) under `app/api/` — submission intake, Slack interactivity, Slack events, and admin auth.
- **Slack**: `@slack/web-api` (`lib/slack.ts`) posts Block Kit messages and verifies inbound request signatures. Approve/Reject buttons require a **custom Slack app** (a managed connector cannot set the interactivity Request URL or expose a signing secret).
- **Member invites**: handled by Slack's own native "Invite people" dialog (no email service). On a Free/Pro plan Slack offers no public API to invite by email, so this is a manual one-paste step per approval; the approval message surfaces the applicant's email (inline code, one-click copy) to make it frictionless.
- **Welcome on join (@mention)**: the community welcome is posted when the approved applicant actually **joins the workspace**, not at approval time, so it can `@`-mention their real Slack account. The Slack app subscribes to the `team_join` event (needs the `users:read.email` scope); the handler matches the joiner's email to an approved submission and posts to `#chatter` exactly once (idempotent against Slack event retries via the `welcomed_at` claim).
- **Animation**: A custom `AnimatedSection` component (`components/ui/animated-section.tsx`) using the IntersectionObserver API. No animation library.
- **Icons**: Inline SVG components (no icon package).

### Join flow

1. Visitor completes the multi-step form → `POST /api/submissions` (zod-validated) → row inserted into `submissions`.
2. The submission is posted to the Slack partners channel with Approve/Reject buttons; the message timestamp is stored on the row.
3. A reviewer clicks a button → Slack calls `POST /api/slack/interactivity` (signature-verified). The decision update is **atomic** (`WHERE id = ? AND status = 'pending'`) so concurrent clicks run side effects only once.
4. On approve: the original message is updated and shows a reminder to invite the applicant by pasting their email into Slack's "Invite people" dialog. (No welcome is posted yet.)
5. When the approved applicant joins the workspace → Slack calls `POST /api/slack/events` (`team_join`, signature-verified). The handler matches their email to an approved, not-yet-welcomed submission, **atomically claims it** (`SET welcomed_at = now() WHERE lower(email)=? AND status='approved' AND welcomed_at IS NULL`), and posts the `@`-mention welcome to the chatter channel. A failed post releases the claim so it can retry.
6. `/admin` (password-gated) lists all submissions and their status (including who has joined & been welcomed).

### Referral flow

1. Existing members get a unique `referralCode` (issued on join in the `team_join` handler) and share a `?ref=<code>` link (DM'd to them on join).
2. A visitor landing with `?ref=<code>` has it captured client-side (`lib/referral-client.ts` → localStorage + `2de_ref` cookie) and attached as a hidden `referredByCode` on the form (`components/referral-capture.tsx`).
3. Intake (`/api/submissions`) validates the code → a real member, drops self/unknown codes, stores `referredByCode`, and surfaces the referrer on the Slack review message (🎁 line).
4. When the referred applicant is approved AND joins Slack (the existing `team_join` confirmation gate), `recordReferralReward` creates **one** `earned` $5 reward for the referrer — idempotent via the `UNIQUE referredSubmissionId` + on-conflict-do-nothing. Self-referrals are skipped; over the monthly soft cap (25/30 days) the reward is `flagged` for review instead.
5. An admin reviews referrals on `/admin` and triggers payout (single or batch). `POST /api/admin/referrals/pay` (admin-cookie-gated) atomically claims each reward (`status` → `processing`), calls Tremendous with `external_id = reward_<id>`, then sets `paid` (or `failed` with reason). Recipient email/name and amount come from stored data, never the client.

### Configuration (env / secrets)

- Secrets: `SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`, `ADMIN_PASSWORD`. Tremendous credentials come from the **Replit Tremendous connector** (preferred) or a `TREMENDOUS_API_KEY` secret fallback.
- Env: optional `SLACK_PARTNERS_CHANNEL` / `SLACK_CHATTER_CHANNEL` (default `#syndicate-partners` / `#chatter`).
- Referral/payout env (all optional): `TREMENDOUS_ENV` (`production` to go live; **defaults to sandbox**), `TREMENDOUS_CAMPAIGN_ID` (campaign that lets recipients choose Venmo/PayPal/Visa/bank), `TREMENDOUS_FUNDING_SOURCE_ID` (otherwise the account balance source is auto-detected), `NEXT_PUBLIC_BASE_URL` / `REFERRAL_BASE_URL` for building referral links.
- Slack steps are non-fatal when unconfigured: submissions still persist and the admin page still works. Likewise, the referral admin view renders even when Tremendous is not set up (pay buttons disable).
- Slack app setup: enable **Interactivity** (Request URL `<base>/api/slack/interactivity`) and **Event Subscriptions** (Request URL `<base>/api/slack/events`, subscribed to the `team_join` event). The `team_join` welcome needs the `users:read.email` OAuth scope — without it Slack omits the joiner's email and the welcome silently no-ops. Adding scopes requires reinstalling the app.

### Project structure

- `app/` — App Router entry. `page.tsx` composes the page and mounts the join-form modal; `layout.tsx` sets up fonts/metadata; `globals.css` holds global styles and custom utilities.
  - `app/api/submissions/route.ts` — form intake.
  - `app/api/slack/interactivity/route.ts` — Slack Approve/Reject button handler.
  - `app/api/slack/events/route.ts` — Slack `team_join` handler that posts the @-mention welcome on join.
  - `app/api/admin/{login,logout}/route.ts` — admin auth.
  - `app/api/admin/referrals/pay/route.ts` — admin-gated referral payout trigger (single/batch, atomic claim → Tremendous).
  - `app/admin/` — password-gated submissions list + referrals panel (`referrals-panel.tsx`).
- `components/`
  - `sections/` — page blocks: `hero`, `purpose`, `principles`, `portfolio`, `partners`.
  - `forms/join-form.tsx` — the native multi-step application form (modal).
  - `referral-capture.tsx` — mounts on the landing page to capture `?ref=` codes.
  - `ui/` — reusable pieces: `company-card`, `partner-card`, `section-header`, `animated-section`, `image`.
  - `navigation.tsx` — fixed top nav (scroll-spy, mobile menu, JOIN launcher).
  - `footer.tsx` — site footer.
- `db/` — `schema.ts` (the `submissions` table + `referral_rewards` table & relations) and `index.ts` (pg Pool + Drizzle client).
- `lib/`
  - `join-form.ts` — shared zod schema + question/option constants.
  - `join-modal.ts` — global event opener for the form.
  - `slack.ts` — Slack client, Block Kit builders, signature verification.
  - `admin.ts` — admin cookie token helpers.
  - `referral.ts` — server-side referral helpers (code generation/issuance, reward recording with self/dup/cap anti-fraud, link building).
  - `referral-client.ts` — client-side `?ref=` capture (localStorage + cookie).
  - `tremendous.ts` — server-only payout client (connector or `TREMENDOUS_API_KEY`; sandbox by default; idempotent orders).
  - `constants.ts` — image asset paths and `COMPANIES` data; `theme.ts` — design tokens; `utils.ts` — `cn()` helper.
- `server/`
  - `index.ts` — minimal custom Next.js server (Node `http`) on port 5000 for Replit (uses Next's request handler — not Express).
- `types/index.ts` — shared interfaces. `public/images/` — logos and partner photos.

### Running the project

The `Start application` workflow runs `npm run dev` (`tsx server/index.ts`), serving the Next.js app on port 5000. Edits hot-reload.

### Build

`npm run build` runs `next build` and bundles `server/index.ts` with esbuild into `dist/`. `npm run start` serves the production build.

### Notes / housekeeping

- The Slack interactivity Request URL must be publicly reachable; in production use `https://2daysearly.com/api/slack/interactivity`.
- `components.json` (shadcn config) and `theme.json` are leftover from the project template and are not actively consumed; the live design comes from Tailwind config + `globals.css`.
- Do not assume a Vite setup exists; this project is Next.js only.

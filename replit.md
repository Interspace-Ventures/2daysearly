# 2 Days Early

## Overview

Marketing website for "2 Days Early", an operator-led investment syndicate (Chime alumni and fintech operators). It presents the syndicate's purpose, principles, portfolio companies, and partners, and lets interested operators apply through a **native multi-step join form** built into the site.

Applications are stored in Postgres and routed for review through Slack: each submission posts to a partners channel with Approve/Reject buttons. On approval, a welcome message is posted to a community channel and the applicant is emailed a Slack invite link. A password-protected admin page lists all applications.

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
- **API**: Next.js route handlers (Node runtime) under `app/api/` — submission intake, Slack interactivity, and admin auth.
- **Slack**: `@slack/web-api` (`lib/slack.ts`) posts Block Kit messages and verifies inbound request signatures. Approve/Reject buttons require a **custom Slack app** (a managed connector cannot set the interactivity Request URL or expose a signing secret).
- **Email**: Resend (via the Replit Resend connector, or a `RESEND_API_KEY` fallback) sends the invite email in `server/email.ts`.
- **Animation**: A custom `AnimatedSection` component (`components/ui/animated-section.tsx`) using the IntersectionObserver API. No animation library.
- **Icons**: Inline SVG components (no icon package).

### Join flow

1. Visitor completes the multi-step form → `POST /api/submissions` (zod-validated) → row inserted into `submissions`.
2. The submission is posted to the Slack partners channel with Approve/Reject buttons; the message timestamp is stored on the row.
3. A reviewer clicks a button → Slack calls `POST /api/slack/interactivity` (signature-verified). The decision update is **atomic** (`WHERE id = ? AND status = 'pending'`) so concurrent clicks run side effects only once.
4. On approve: the original message is updated, a welcome is posted to the chatter channel, and the applicant is emailed the Slack invite link.
5. `/admin` (password-gated) lists all submissions and their status.

### Configuration (env / secrets)

- Secrets: `SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`, `ADMIN_PASSWORD` (and `RESEND_API_KEY` if not using the Resend connector).
- Env: `SLACK_INVITE_URL` (the shared Slack invite link), `RESEND_FROM` (verified sender), optional `SLACK_PARTNERS_CHANNEL` / `SLACK_CHATTER_CHANNEL` (default `#syndicate-partners` / `#chatter`).
- Slack/email steps are non-fatal when unconfigured: submissions still persist and the admin page still works.

### Project structure

- `app/` — App Router entry. `page.tsx` composes the page and mounts the join-form modal; `layout.tsx` sets up fonts/metadata; `globals.css` holds global styles and custom utilities.
  - `app/api/submissions/route.ts` — form intake.
  - `app/api/slack/interactivity/route.ts` — Slack button handler.
  - `app/api/admin/{login,logout}/route.ts` — admin auth.
  - `app/admin/` — password-gated submissions list.
- `components/`
  - `sections/` — page blocks: `hero`, `purpose`, `principles`, `portfolio`, `partners`.
  - `forms/join-form.tsx` — the native multi-step application form (modal).
  - `ui/` — reusable pieces: `company-card`, `partner-card`, `section-header`, `animated-section`, `image`.
  - `navigation.tsx` — fixed top nav (scroll-spy, mobile menu, JOIN launcher).
  - `footer.tsx` — site footer.
- `db/` — `schema.ts` (the `submissions` table) and `index.ts` (pg Pool + Drizzle client).
- `lib/`
  - `join-form.ts` — shared zod schema + question/option constants.
  - `join-modal.ts` — global event opener for the form.
  - `slack.ts` — Slack client, Block Kit builders, signature verification.
  - `admin.ts` — admin cookie token helpers.
  - `constants.ts` — image asset paths and `COMPANIES` data; `theme.ts` — design tokens; `utils.ts` — `cn()` helper.
- `server/`
  - `index.ts` — minimal custom Next.js server (Node `http`) on port 5000 for Replit (uses Next's request handler — not Express).
  - `email.ts` — Resend invite email.
- `types/index.ts` — shared interfaces. `public/images/` — logos and partner photos.

### Running the project

The `Start application` workflow runs `npm run dev` (`tsx server/index.ts`), serving the Next.js app on port 5000. Edits hot-reload.

### Build

`npm run build` runs `next build` and bundles `server/index.ts` with esbuild into `dist/`. `npm run start` serves the production build.

### Notes / housekeeping

- The Slack interactivity Request URL must be publicly reachable; in production use `https://2daysearly.com/api/slack/interactivity`.
- `components.json` (shadcn config) and `theme.json` are leftover from the project template and are not actively consumed; the live design comes from Tailwind config + `globals.css`.
- Do not assume a Vite setup exists; this project is Next.js only.

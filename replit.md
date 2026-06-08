# 2 Days Early

## Overview

Marketing website for "2 Days Early", an operator-led investment syndicate (Chime alumni and fintech operators). It's a single-page site that presents the syndicate's purpose, principles, portfolio companies, and partners, and lets interested operators apply via an embedded Tally form.

The design uses a neobrutalism aesthetic — bold type, sharp 2px black borders, and offset drop shadows — built around a green color palette.

## User Preferences

- **Communication style**: Simple, everyday language.
- **Typography**: Matching the Structured Liquidity framework's three-tier type system — Archivo for display/headings (tight -0.02em tracking), Outfit for body copy, and Space Mono (uppercase, loose tracking) for labels, nav links, and buttons. Reusable `.sl-display` / `.sl-body` / `.sl-label` utility classes live in `app/globals.css`.
- **Design aesthetic**: Neobrutalism using a green (Chime-style) palette rather than bright primary colors.
- **Code architecture**: Clean, modular components with proper TypeScript typing.
- **Layout alignment**: Left-align to the card edge, right-align to the box-shadow edge for visual balance.
- **Responsive spacing**: Keep components close together while accounting for the box-shadow's visual footprint.
- **Section height**: Compact layout with reduced section padding.

## Architecture

### Stack

- **Framework**: Next.js 15 (App Router) with React 18 and TypeScript.
- **Styling**: Tailwind CSS 3 plus custom utilities in `app/globals.css` (fluid typography, responsive grids, neobrutalism helpers). Class composition via `clsx` and `tailwind-merge`.
- **Animation**: A custom `AnimatedSection` component (`components/ui/animated-section.tsx`) using the IntersectionObserver API for scroll-triggered reveals. No animation library.
- **Icons**: Inline SVG components (no icon package).
- **Forms**: Tally is embedded directly as an iframe (opened from the nav "JOIN" button) — no npm package or backend involved.

There is **no database, no API layer, and no separate backend framework**. The site is fully static/presentational; all content lives in code.

### Project structure

- `app/` — App Router entry. `page.tsx` composes the page sections; `layout.tsx` sets up fonts and metadata; `globals.css` holds global styles and custom utilities.
- `components/`
  - `sections/` — top-level page blocks: `hero`, `purpose`, `principles`, `portfolio`, `partners`.
  - `ui/` — reusable pieces: `company-card`, `partner-card`, `section-header`, `animated-section`, `image`.
  - `navigation.tsx` — fixed top nav (scroll-spy, mobile menu, Tally form launcher).
  - `footer.tsx` — site footer.
- `lib/`
  - `constants.ts` — image asset paths and the `COMPANIES` portfolio data.
  - `theme.ts` — shared font, color, and shadow tokens plus the `getNeoBrutalistStyle()` helper.
  - `utils.ts` — `cn()` class-merge helper.
- `types/index.ts` — shared interfaces (`Company`, `Partner`, `ImageAsset`, `Theme`).
- `public/images/` — logos and partner photos. Portfolio logos are black-on-transparent (some are hand-built wordmark SVGs).
- `server/index.ts` — minimal custom Next.js server (Node `http`) that runs the app on port 5000 for Replit. It uses Next's own request handler — it is not Express.

### Running the project

The `Start application` workflow runs `npm run dev` (`tsx server/index.ts`), which serves the Next.js app on port 5000. Edits hot-reload automatically.

### Build

`npm run build` runs `next build` and bundles `server/index.ts` with esbuild into `dist/`. `npm run start` serves the production build.

### Notes / housekeeping

- `components.json` (shadcn config) and `theme.json` are leftover from the project template and are not actively consumed; the live design comes from Tailwind config + `globals.css`. The empty `db/` folder and the `db:push` script are vestigial — no database is in use.
- Do not edit the Vite-related ignore entries or assume a Vite setup exists; this project is Next.js only.

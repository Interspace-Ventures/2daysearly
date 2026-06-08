---
name: 2 Days Early site notes
description: Non-obvious facts about the 2 Days Early Next.js marketing site (stack reality, logo/SVG conventions, cache gotcha)
---

## Stack reality vs replit.md
replit.md claims Express + Vite + Drizzle + Postgres + shadcn/Radix. **None of that is actually used.** The app is plain Next.js 15 App Router (single-page `app/page.tsx` composing section components) booted via a custom `server/index.ts`. There is no DB, no API, no shadcn. Trust the code, not replit.md's stack section.

## Portfolio logos = hand-built wordmark SVGs
Portfolio cards (`components/ui/company-card.tsx`) render a logo with `object-contain` inside a fixed-height card. Logos must be black-on-transparent and visually consistent in scale.

**Centering / sizing technique (non-obvious):** with `object-contain`, the SVG's *viewBox* must be symmetric around the actual content, or the logo looks off-center / over-sized. To get exact content bounds, render and trim:
```
magick -background none file.svg -trim info:   # prints WxH+offsetX+offsetY
```
Then build a viewBox with equal margins around that content box. Example: Instaswitch content measured 169x38 at offset +5+4 → viewBox `0 0 179 46` (5px L/R, 4px T/B margins) centers it. To make a wordmark appear *smaller* relative to siblings, give it a shorter/wider viewBox with more internal padding (Mine uses `0 0 200 96` with centered 42px text).

**Why:** earlier guesses at text width were wildly off (Arial bold ~22px "InstaSwitch" is ~169px, not the ~113px estimated), causing clipping and left-shift. Always measure, don't estimate.

## "Green MODS" palette = carbon dark + mint-teal
When the user says the "green pairing from mods" / "MODS theme", they mean the green theme variant in the MODS panel on structured.glass: a **carbon-dark** base with a **mint-teal green** highlight. Colors were sampled from their phone screenshots (phone brightness dims them, so the live accent reads brighter). Tokens live in `app/globals.css` `:root` (`--carbon-*`, `--mint*`). The SL-style navbar (floating inset glass box, flat offset shadow, mono labels, filled mint CTA) is built from `.sl-nav-*` / `.sl-mnav-*` classes there.
**Why:** "mods" is unresolvable from code alone — it's an external reference to structured.glass's theme switcher.

This palette is now applied **site-wide**: one unified `--carbon-bg` background (no per-section green gradients), sections distinguished by headers/design elements, mint accents throughout. Two surfaces intentionally stay **white** and must NOT be carbon-ized: portfolio logo plates (`company-card`) and footer social-icon plates — both hold black-on-transparent SVGs that need a light backdrop. The Tally JOIN modal container (`lib/tally.ts`) also stays white **on purpose**: the embed URL uses `transparentBackground=1`, so the third-party form's dark text renders on whatever's behind it — a carbon container would make the form text unreadable. Its header bar is mint, shadows/borders carbon.

**CSS layer precedence gotcha:** unlayered `body { color/background-color }` rules (top of `globals.css`) override anything in `@layer base`, so the carbon body colors win regardless. Keep `@layer base body` in sync with carbon tokens anyway to avoid confusion. To recolor on mint pills, use `.sl-pill` and DON'T add `text-white` on inner `<a>` — Tailwind's utilities layer beats `.sl-pill a` (components layer) and would override the mint-ink link color.

## Next.js stale-cache gotcha
After deleting/renaming component files, the dev server can throw `__webpack_modules__[moduleId] is not a function` (HTTP 500). Fix: `rm -rf .next` then restart the `Start application` workflow. `.next` is now gitignored.

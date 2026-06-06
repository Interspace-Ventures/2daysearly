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

## Next.js stale-cache gotcha
After deleting/renaming component files, the dev server can throw `__webpack_modules__[moduleId] is not a function` (HTTP 500). Fix: `rm -rf .next` then restart the `Start application` workflow. `.next` is now gitignored.

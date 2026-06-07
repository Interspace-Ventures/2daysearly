# Threat Model

## Project Overview

2 Days Early is a public marketing site built with Next.js App Router, React, and a minimal custom Node `http` server. In production it serves mostly static content and opens a hardcoded Tally form in an iframe for operator applications. There is no application database, no custom API layer, no user authentication, and no admin surface in this repo.

## Assets

- **Site integrity and brand trust** — visitors should see only the intended marketing content and outbound links. Unauthorized script injection or content tampering would directly affect brand reputation and could be used for phishing.
- **Visitor interaction with the application form** — the JOIN flow sends users to a third-party Tally embed. The app must not let attackers swap that destination or inject a malicious form.
- **Deployment and runtime configuration** — the public deployment at `2daysearly.com` is internet-reachable. Production server behavior and headers must not expose debug-only behavior or unnecessary attack surface.

## Trust Boundaries

- **Browser to Next.js server** — all public requests hit the custom server in `server/index.ts`, which delegates to Next's request handler. The browser is untrusted.
- **Application to third-party Tally embed** — the client injects an iframe pointing to `https://tally.so/embed/nP1v8e...`. This is the main external trust boundary because application traffic and user submission flow cross into a third-party origin.
- **Application to external outbound links** — users can be sent to external domains from navigation, portfolio cards, footer links, and mailto links. Those destinations must remain intentional and hardcoded.
- **Production vs dev-only/template leftovers** — vestigial files like `db/`, `db:push`, and template config are out of scope unless production code imports or executes them.

## Scan Anchors

- **Production entry points:** `server/index.ts`, `app/layout.tsx`, `app/page.tsx`
- **Highest-risk production code:** `next.config.js` headers, `lib/tally.ts` iframe/embed logic, client components that render links or dynamic DOM
- **Public surface:** the entire site is public; there are no authenticated or admin routes in this repo
- **Usually dev-only / ignore unless proven reachable:** `db/`, leftover template config, build artifacts, and non-imported scaffolding

## Threat Categories

### Tampering

Because the site is mostly static, tampering risk is concentrated in client-side DOM creation and outbound navigation. The application must only create trusted DOM elements from hardcoded values, and any third-party embed or external navigation target must remain fixed rather than user-controlled.

### Information Disclosure

The app should not expose debug details, stack traces, internal paths, secrets, or unintended metadata in public responses. Since there is no database or private user data in the repo, the main guarantee is that production configuration stays minimal and does not leak internals through headers, error output, or accidental client-side secret exposure.

### Spoofing

Users rely on the site to send them to the correct join flow and external destinations. The application must ensure the Tally form destination and other outbound links are explicit, trusted, and not attacker-replaceable through query parameters, CMS content, or client-controlled state.

### Elevation of Privilege

There is no in-app account system or admin panel, so classic authorization issues are largely not applicable. The relevant guarantee is that the custom Node server should not add privileged endpoints, file access behavior, or request handling beyond Next's normal static-site serving path.

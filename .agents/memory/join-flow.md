---
name: 2 Days Early join flow
description: Durable constraints for the native Tally-replacement join flow (zod v4 + RHF, Slack interactivity, atomic decisions).
---

# Native join flow (replaced Tally)

## Zod v4 + react-hook-form
- This repo runs **zod v4**. The v3 `{ errorMap: () => ({ message }) }` option is gone — pass `{ message: '...' }` (or `{ error }`) to `z.enum(...)` / `z.literal(...)`.
- In a form schema consumed by `zodResolver`, do **not** use `.default()` / `.optional()` on fields. They make `z.input` differ from `z.output`, which breaks `useForm<z.infer<...>>` resolver typing. Keep input === output (e.g. an "optional" text field is `z.string().trim().max(n)` allowing `''`, with a `''` form default). DeepPartial `defaultValues` still lets enum/`literal(true)` fields default to `undefined`/cast.
- **Why:** spent multiple iterations chasing `Resolver` type mismatches before realizing defaults/optionals were the cause.

## Slack approvals require a CUSTOM Slack app
- Approve/Reject buttons live *inside* Slack, so Slack must POST to our interactivity Request URL with a signing secret. The managed Replit Slack connector cannot set a Request URL or expose a signing secret → a self-built Slack app is mandatory.

## Member invites are manual via Slack's native dialog (no email service)
- Free/Pro Slack plans have **no public API** to invite users by email (only Enterprise Grid's `admin.users.invite`). The project deliberately **dropped Resend/email entirely**; invites are done by the reviewer pasting the applicant's email into Slack's native "Invite people" dialog.
- **Why:** user had no Resend account and Slack already sends an official invite email; a one-paste-per-approval manual step beats domain/DNS setup for a low-volume, hand-approved syndicate.
- **How it shows up:** the approval message (`buildDecidedBlocks`, approved branch) appends a nudge line with the email in inline-code (one-click copy). No `SLACK_INVITE_URL` / `RESEND_*` env, no `server/email.ts`.

## Welcome posts on JOIN (team_join), not on approval — so it can @-mention
- To `@`-mention a new member the post must happen *after* they exist in the workspace. So the welcome was moved out of the approve branch into a Slack **Events API** endpoint handling `team_join`; it matches the joiner's email (case-insensitive) to an approved submission and posts to `#chatter` with `buildWelcomeBlocks(s, slackUserId)`.
- **Why:** at approval time the applicant hasn't joined yet (no Slack user id to tag); approval only nudges the reviewer to invite them.
- **Requires Slack config:** Event Subscriptions on (Request URL `<base>/api/slack/events`), subscribe `team_join`, and the **`users:read.email`** scope — without that scope the event omits `profile.email` and the handler silently no-ops. Adding scopes needs an app reinstall.
- **Idempotency:** an atomic claim `UPDATE ... SET welcomed_at=now() WHERE lower(email)=? AND status='approved' AND welcomed_at IS NULL RETURNING *` guards against Slack's event retries; a failed post releases the claim (`welcomed_at=null`) so it can retry. Accepted rare double-post: post succeeds but the await throws after, then Slack retries.

## Decision handler must be atomic
- The interactivity handler records approve/reject with `UPDATE ... WHERE id = ? AND status = 'pending' RETURNING *`. If zero rows return, exit before any side effects.
- Slack calls are best-effort: guard `getSlackClient()` in try/catch so a missing bot token can't 500 the route after the DB decision is already committed. The same raw-body signature verification (`verifySlackSignature`) protects both the interactivity and events endpoints; Slack signs the `url_verification` handshake too, so verify before answering the challenge.

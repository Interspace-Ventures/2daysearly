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

## Decision handler must be atomic
- The interactivity handler records approve/reject with `UPDATE ... WHERE id = ? AND status = 'pending' RETURNING *`. If zero rows return, exit before any side effects. A read-then-update would let two near-simultaneous clicks both fire the welcome post twice.
- Slack calls are best-effort: guard `getSlackClient()` in try/catch so a missing bot token can't 500 the route after the DB decision is already committed.

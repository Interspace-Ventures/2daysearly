---
name: Imported historical submissions
description: How past-submission exports live in the submissions table and how to query metrics over them
---

# Imported historical submissions

Past application exports (Tally CSV + XLSX) were de-duped by lowercased email and bulk-loaded into the `submissions` table with `status = 'imported'`.

**Why:** the user wanted membership metrics (role distribution, fintech-interest counts, total investing capacity) over all historical applicants, without mixing them into the live application pipeline.

**How to apply:**
- `status = 'imported'` is the marker that separates historical rows from the live `pending | approved | rejected` workflow. The admin page (`app/admin/page.tsx`) deliberately filters these out of the review queue and operational counts, surfacing only a count.
- Metrics queries should include ALL statuses (or filter to `'imported'`) — don't assume the operational statuses.
- `experienceTags` and `fintechInterests` are jsonb arrays; query containment with the Postgres `?` operator, e.g. `fintech_interests ? 'Lending'`.
- The importer (`scripts/import-submissions.ts`) is idempotent: it deletes `status='imported'` rows then re-inserts, so it can be safely re-run. It only ever touches imported rows.
- Source files used different formats; budgets ("$2 - $10K" vs "$2K - $10K", ">$100K" vs "> $100K") and roles ("Startup founder" → "Founder") must be normalized to the canonical option lists in `lib/join-form.ts` before counts are meaningful.

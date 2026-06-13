import { readFileSync } from 'fs';
import { eq } from 'drizzle-orm';
import { db } from '../db/index';
import { submissions } from '../db/schema';

type ImportRecord = {
  firstName: string;
  lastName: string;
  email: string;
  referralSource: string;
  currentWork: string;
  experienceTags: string[];
  linkedinUrl: string;
  fintechInterests: string[];
  annualBudget: string;
  helpOffer: string;
  learnInterest: string;
  hobbies: string;
  codeOfConduct: boolean;
  submittedAt: string;
  status: string;
};

function parseSubmittedAt(s: string): Date | undefined {
  if (!s) return undefined;
  const d = new Date(s.replace(' ', 'T') + 'Z');
  return isNaN(d.getTime()) ? undefined : d;
}

async function main() {
  const path = process.argv[2] || '/tmp/import_records.json';
  const records = JSON.parse(readFileSync(path, 'utf-8')) as ImportRecord[];

  // Idempotent: clear any previously imported rows so re-running is safe.
  const deleted = await db
    .delete(submissions)
    .where(eq(submissions.status, 'imported'))
    .returning({ id: submissions.id });
  console.log(`Cleared ${deleted.length} existing 'imported' rows.`);

  const rows = records.map((r) => {
    const createdAt = parseSubmittedAt(r.submittedAt);
    return {
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email,
      referralSource: r.referralSource || null,
      currentWork: r.currentWork,
      experienceTags: r.experienceTags ?? [],
      linkedinUrl: r.linkedinUrl,
      fintechInterests: r.fintechInterests ?? [],
      annualBudget: r.annualBudget,
      helpOffer: r.helpOffer,
      learnInterest: r.learnInterest,
      hobbies: r.hobbies,
      codeOfConduct: r.codeOfConduct,
      status: 'imported',
      ...(createdAt ? { createdAt } : {}),
    };
  });

  const inserted = await db.insert(submissions).values(rows).returning({ id: submissions.id });
  console.log(`Inserted ${inserted.length} imported submissions.`);

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

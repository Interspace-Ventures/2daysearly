import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@db/index';
import { submissions } from '@db/schema';
import { joinFormSchema } from '@/lib/join-form';
import {
  getSlackClient,
  isSlackConfigured,
  buildSubmissionBlocks,
  resolveChannelId,
  PARTNERS_CHANNEL,
} from '@/lib/slack';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = joinFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // 1. Persist the submission.
  const [created] = await db
    .insert(submissions)
    .values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      referralSource: data.referralSource || null,
      currentWork: data.currentWork,
      experienceTags: data.experienceTags,
      linkedinUrl: data.linkedinUrl,
      fintechInterests: data.fintechInterests,
      annualBudget: data.annualBudget,
      helpOffer: data.helpOffer,
      learnInterest: data.learnInterest,
      hobbies: data.hobbies,
      codeOfConduct: data.codeOfConduct,
    })
    .returning();

  // 2. Notify the partners channel (non-fatal if Slack isn't configured yet).
  if (isSlackConfigured()) {
    try {
      const slack = getSlackClient();
      const channel = await resolveChannelId(slack, PARTNERS_CHANNEL);
      const posted = await slack.chat.postMessage({
        channel,
        text: `New application from ${created.firstName} ${created.lastName}`,
        blocks: buildSubmissionBlocks(created) as any,
      });
      if (posted.ok) {
        await db
          .update(submissions)
          .set({
            slackMessageTs: posted.ts as string,
            slackChannel: posted.channel as string,
          })
          .where(eq(submissions.id, created.id));
      }
    } catch (err) {
      console.error('Slack notify failed:', err);
    }
  }

  return NextResponse.json({ ok: true, id: created.id });
}

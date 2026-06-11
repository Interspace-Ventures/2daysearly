import { pgTable, serial, text, jsonb, boolean, timestamp, varchar } from 'drizzle-orm/pg-core';

// Syndicate onboarding submissions. Mirrors the questions from the original
// Tally form, now stored locally so they are queryable and exportable.
export const submissions = pgTable('submissions', {
  id: serial('id').primaryKey(),

  // Identity
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),

  // Context
  referralSource: text('referral_source'),
  currentWork: text('current_work').notNull(),
  experienceTags: jsonb('experience_tags').$type<string[]>().notNull().default([]),
  linkedinUrl: text('linkedin_url').notNull(),
  fintechInterests: jsonb('fintech_interests').$type<string[]>().notNull().default([]),
  annualBudget: text('annual_budget').notNull(),
  helpOffer: text('help_offer').notNull(),
  learnInterest: text('learn_interest').notNull(),
  hobbies: text('hobbies').notNull(),
  codeOfConduct: boolean('code_of_conduct').notNull().default(false),

  // Review workflow
  status: varchar('status', { length: 16 }).notNull().default('pending'), // pending | approved | rejected
  slackMessageTs: text('slack_message_ts'),
  slackChannel: text('slack_channel'),
  decidedBy: text('decided_by'),
  decidedAt: timestamp('decided_at'),
  welcomedAt: timestamp('welcomed_at'), // set when they join Slack and the welcome posts

  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;

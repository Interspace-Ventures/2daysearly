import { pgTable, serial, text, jsonb, boolean, timestamp, varchar, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

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

  // Referral program
  // This member's own shareable code, issued when they join (welcomed). Others
  // who apply via `?ref=<referralCode>` get attributed to this member.
  referralCode: text('referral_code').unique(),
  // The (validated) referral code this applicant came in through, if any.
  referredByCode: text('referred_by_code'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// One row per confirmed referral: a $5 reward owed to the referrer because the
// person they referred was approved by a partner AND actually joined Slack with
// a verified email. Created at confirmation time, paid later via the admin.
export const referralRewards = pgTable('referral_rewards', {
  id: serial('id').primaryKey(),

  // The member who earns the reward.
  referrerSubmissionId: integer('referrer_submission_id')
    .notNull()
    .references(() => submissions.id),
  // The joined person whose arrival triggered the reward. Unique so a single
  // joined person can only ever generate one reward (idempotent + dedupe).
  referredSubmissionId: integer('referred_submission_id')
    .notNull()
    .unique()
    .references(() => submissions.id),

  amountCents: integer('amount_cents').notNull().default(500),
  // earned  — confirmed & payable
  // paid    — payout sent via provider
  // failed  — payout attempt failed
  // flagged — withheld for manual review (e.g. over cap / suspicious)
  // void    — manually invalidated
  status: varchar('status', { length: 16 }).notNull().default('earned'),
  flagReason: text('flag_reason'),

  provider: text('provider'),
  providerPayoutId: text('provider_payout_id'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  paidAt: timestamp('paid_at'),
});

export const referralRewardsRelations = relations(referralRewards, ({ one }) => ({
  referrer: one(submissions, {
    fields: [referralRewards.referrerSubmissionId],
    references: [submissions.id],
    relationName: 'referrer',
  }),
  referred: one(submissions, {
    fields: [referralRewards.referredSubmissionId],
    references: [submissions.id],
    relationName: 'referred',
  }),
}));

export const submissionsRelations = relations(submissions, ({ many }) => ({
  // Rewards this member earned by referring others.
  earnedRewards: many(referralRewards, { relationName: 'referrer' }),
}));

export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
export type ReferralReward = typeof referralRewards.$inferSelect;
export type NewReferralReward = typeof referralRewards.$inferInsert;

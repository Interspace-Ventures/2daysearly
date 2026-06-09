import { z } from 'zod';

// Single source of truth for the syndicate onboarding questions.
// Shared by the client form and the server-side validation.

export const CURRENT_WORK_OPTIONS = [
  'Analytics',
  'Business Development',
  'Design',
  'Engineering',
  'Finance',
  'Growth / Marketing',
  'Founder',
  'OMX / Operations',
  'Product',
  'Legal / Compliance',
  'Risk',
  'Recruiting',
  'User Research',
  'Venture Capital / Investing',
  'Other',
] as const;

export const EXPERIENCE_OPTIONS = [
  'I have experience scaling companies from 0 - 100 employees',
  'I have designed products in a regulated industry',
  'I have experience building risk / finance / analytics models with data sources',
  'I have shipped products and/or features that build trust',
] as const;

export const FINTECH_INTEREST_OPTIONS = [
  'Banking',
  'Insurance',
  'Investing',
  'Lending',
  'Payments',
  'Crypto',
  'Infrastructure',
] as const;

export const ANNUAL_BUDGET_OPTIONS = [
  '$2K - $10K',
  '$10K - $25K',
  '$25K - $50K',
  '$50K - $100K',
  '>$100K',
] as const;

export const joinFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().trim().email('Enter a valid email address'),
  referralSource: z.string().trim().max(500),
  currentWork: z.enum(CURRENT_WORK_OPTIONS, { message: 'Select what you do for work' }),
  experienceTags: z.array(z.enum(EXPERIENCE_OPTIONS)),
  linkedinUrl: z
    .string()
    .trim()
    .url('Enter the full LinkedIn URL (https://...)')
    .refine((v) => /linkedin\.com/i.test(v), 'Must be a LinkedIn URL'),
  fintechInterests: z
    .array(z.enum(FINTECH_INTEREST_OPTIONS))
    .min(1, 'Pick at least one area'),
  annualBudget: z.enum(ANNUAL_BUDGET_OPTIONS, { message: 'Select a budget range' }),
  helpOffer: z.string().trim().min(1, 'This field is required').max(2000),
  learnInterest: z.string().trim().min(1, 'This field is required').max(2000),
  hobbies: z.string().trim().min(1, 'This field is required').max(2000),
  codeOfConduct: z.literal(true, { message: 'You must affirm the community commitment' }),
});

export type JoinFormValues = z.infer<typeof joinFormSchema>;

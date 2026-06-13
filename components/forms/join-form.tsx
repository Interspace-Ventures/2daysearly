'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  joinFormSchema,
  type JoinFormValues,
  CURRENT_WORK_OPTIONS,
  EXPERIENCE_OPTIONS,
  FINTECH_INTEREST_OPTIONS,
  ANNUAL_BUDGET_OPTIONS,
} from '@/lib/join-form';
import { JOIN_FORM_EVENT } from '@/lib/join-modal';
import { getStoredRefCode } from '@/lib/referral-client';

const inputClass =
  'w-full bg-white text-black border-2 border-black px-3 py-2.5 text-base outline-none focus:bg-[#f4fdf8] placeholder:text-neutral-400';

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span
      className="sl-label block mb-1.5"
      style={{ color: 'var(--carbon-text)', fontSize: '0.72rem' }}
    >
      {children}
      {required && <span style={{ color: 'var(--mint)' }}> *</span>}
    </span>
  );
}

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 text-sm font-medium" style={{ color: '#ff6b6b' }}>
      {msg}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="sl-label"
      style={{
        color: 'var(--mint)',
        fontSize: '0.78rem',
        paddingBottom: '0.5rem',
        borderBottom: '2px solid var(--carbon-border)',
      }}
    >
      {children}
    </h3>
  );
}

export default function JoinFormModal() {
  const [open, setOpen] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),
    shouldUnregister: false,
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      referralSource: '',
      referredByCode: '',
      currentWork: undefined,
      experienceTags: [],
      linkedinUrl: '',
      fintechInterests: [],
      annualBudget: undefined,
      helpOffer: '',
      learnInterest: '',
      hobbies: '',
      codeOfConduct: false as unknown as true,
    },
  });

  const { register, handleSubmit, reset, formState } = form;
  const { errors } = formState;

  // The form is long; if submit fails validation, bring the first error into view.
  const onInvalid = (formErrors: typeof errors) => {
    const firstName = Object.keys(formErrors)[0];
    if (!firstName) return;
    const el = document.querySelector(`[name="${firstName}"]`) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus({ preventScroll: true });
    }
  };

  // Open via the global custom event.
  useEffect(() => {
    const onOpen = () => {
      setSubmitState('idle');
      setSubmitError('');
      // Attribute this application to a referrer if they arrived via a ref link.
      form.setValue('referredByCode', getStoredRefCode());
      setOpen(true);
    };
    window.addEventListener(JOIN_FORM_EVENT, onOpen);
    return () => window.removeEventListener(JOIN_FORM_EVENT, onOpen);
  }, []);

  // Lock body scroll + Escape to close while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!open) return null;

  const onSubmit = async (values: JoinFormValues) => {
    setSubmitState('submitting');
    setSubmitError('');
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }
      setSubmitState('done');
      reset();
    } catch (err) {
      setSubmitState('error');
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(5, 7, 10, 0.7)' }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Join 2 Days Early"
        className="changelog-drawer w-full sm:max-w-2xl flex flex-col"
        style={{
          maxHeight: '94vh',
          background: 'var(--carbon-surface)',
          border: '3px solid var(--carbon-border)',
          boxShadow: '8px 8px 0px 0px var(--carbon-shadow)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ background: 'var(--mint)', color: 'var(--mint-ink)' }}
        >
          <div>
            <p className="sl-label" style={{ fontSize: '0.68rem', opacity: 0.8 }}>
              Apply to join
            </p>
            <h2 className="sl-display font-extrabold" style={{ fontSize: '1.3rem', lineHeight: 1.1 }}>
              {submitState === 'done' ? 'You’re on the list' : 'Join 2 Days Early'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="flex items-center justify-center"
            style={{
              width: '2rem',
              height: '2rem',
              background: 'var(--mint-ink)',
              color: 'var(--mint)',
              border: '2px solid var(--mint-ink)',
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {submitState === 'done' ? (
          <div className="px-6 py-10 text-center">
            <div
              className="mx-auto mb-5 flex items-center justify-center"
              style={{
                width: '3.5rem',
                height: '3.5rem',
                background: 'var(--mint)',
                color: 'var(--mint-ink)',
                border: '2px solid var(--mint-ink)',
              }}
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="sl-body" style={{ color: 'var(--carbon-text)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Thanks for applying. We review every application personally — if it’s a
              fit, you’ll get a Slack invite by email.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="sl-nav-cta sl-label mt-6 font-bold"
              style={{ padding: '0.7rem 1.6rem' }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col min-h-0 flex-1">
            <div className="overflow-y-auto px-5 py-5 space-y-6" style={{ flex: 1 }}>
              {/* Hidden: referral attribution, populated on open. */}
              <input type="hidden" {...register('referredByCode')} />

              {/* About you */}
              <SectionHeading>About you</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label>
                  <FieldLabel required>First name</FieldLabel>
                  <input className={inputClass} {...register('firstName')} />
                  <ErrorText msg={errors.firstName?.message} />
                </label>
                <label>
                  <FieldLabel required>Last name</FieldLabel>
                  <input className={inputClass} {...register('lastName')} />
                  <ErrorText msg={errors.lastName?.message} />
                </label>
              </div>
              <label className="block">
                <FieldLabel required>Email</FieldLabel>
                <input type="email" className={inputClass} {...register('email')} />
                <ErrorText msg={errors.email?.message} />
              </label>
              <label className="block">
                <FieldLabel>How did you hear about us?</FieldLabel>
                <input className={inputClass} {...register('referralSource')} />
                <ErrorText msg={errors.referralSource?.message} />
              </label>

              {/* Your work */}
              <SectionHeading>Your work</SectionHeading>
              <fieldset>
                <FieldLabel required>What do you do for work?</FieldLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CURRENT_WORK_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                      style={{ background: 'var(--carbon-card)', border: '2px solid var(--carbon-border)', color: 'var(--carbon-text)' }}
                    >
                      <input type="radio" value={opt} {...register('currentWork')} className="accent-[var(--mint)]" />
                      <span className="sl-body text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
                <ErrorText msg={errors.currentWork?.message} />
              </fieldset>

              <fieldset>
                <FieldLabel>Which of these describe you? (optional)</FieldLabel>
                <div className="space-y-2">
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-start gap-2.5 px-3 py-2 cursor-pointer"
                      style={{ background: 'var(--carbon-card)', border: '2px solid var(--carbon-border)', color: 'var(--carbon-text)' }}
                    >
                      <input type="checkbox" value={opt} {...register('experienceTags')} className="mt-1 accent-[var(--mint)]" />
                      <span className="sl-body text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <FieldLabel required>LinkedIn URL</FieldLabel>
                <input
                  className={inputClass}
                  placeholder="https://www.linkedin.com/in/..."
                  {...register('linkedinUrl')}
                />
                <ErrorText msg={errors.linkedinUrl?.message} />
              </label>

              {/* Your interests */}
              <SectionHeading>Your interests</SectionHeading>
              <fieldset>
                <FieldLabel required>Which fintech areas interest you?</FieldLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {FINTECH_INTEREST_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                      style={{ background: 'var(--carbon-card)', border: '2px solid var(--carbon-border)', color: 'var(--carbon-text)' }}
                    >
                      <input type="checkbox" value={opt} {...register('fintechInterests')} className="accent-[var(--mint)]" />
                      <span className="sl-body text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
                <ErrorText msg={errors.fintechInterests?.message as string | undefined} />
              </fieldset>

              <fieldset>
                <FieldLabel required>Annual investing budget</FieldLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ANNUAL_BUDGET_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                      style={{ background: 'var(--carbon-card)', border: '2px solid var(--carbon-border)', color: 'var(--carbon-text)' }}
                    >
                      <input type="radio" value={opt} {...register('annualBudget')} className="accent-[var(--mint)]" />
                      <span className="sl-body text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
                <ErrorText msg={errors.annualBudget?.message} />
              </fieldset>

              {/* The community */}
              <SectionHeading>The community</SectionHeading>
              <label className="block">
                <FieldLabel required>What can you help other members with?</FieldLabel>
                <textarea rows={3} className={inputClass} {...register('helpOffer')} />
                <ErrorText msg={errors.helpOffer?.message} />
              </label>
              <label className="block">
                <FieldLabel required>What do you want to learn about?</FieldLabel>
                <textarea rows={3} className={inputClass} {...register('learnInterest')} />
                <ErrorText msg={errors.learnInterest?.message} />
              </label>
              <label className="block">
                <FieldLabel required>What do you do outside of work?</FieldLabel>
                <textarea rows={3} className={inputClass} {...register('hobbies')} />
                <ErrorText msg={errors.hobbies?.message} />
              </label>
              <label
                className="flex items-start gap-2.5 px-3 py-3 cursor-pointer"
                style={{ background: 'var(--carbon-card)', border: '2px solid var(--carbon-border)', color: 'var(--carbon-text)' }}
              >
                <input type="checkbox" {...register('codeOfConduct')} className="mt-1 accent-[var(--mint)]" />
                <span className="sl-body text-sm">
                  I’m committed to being a generous, respectful member of this community.
                </span>
              </label>
              <ErrorText msg={errors.codeOfConduct?.message} />

              {submitState === 'error' && (
                <div
                  className="px-3 py-2.5 text-sm font-medium"
                  style={{ background: '#3a1d1d', border: '2px solid #ff6b6b', color: '#ffb4b4' }}
                >
                  {submitError}
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between gap-3 px-5 py-4"
              style={{ borderTop: '2px solid var(--carbon-border)', background: 'var(--carbon-surface)' }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="sl-nav-ghost sl-label font-bold"
                style={{ padding: '0.65rem 1.2rem' }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="sl-nav-cta sl-label font-bold"
                style={{ padding: '0.65rem 1.6rem' }}
              >
                {submitState === 'submitting' ? 'Submitting…' : 'Submit application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

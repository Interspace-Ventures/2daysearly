'use client';

import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function AdminLogin() {
  return (
    <main
      className="min-h-screen grid place-items-center px-4 py-10"
      style={{ background: 'var(--carbon-bg)' }}
    >
      <div className="grid w-full max-w-4xl border-2 border-black bg-white shadow-[8px_8px_0_0_#000] md:grid-cols-[0.9fr_1.1fr]">
        <section className="flex flex-col justify-between gap-12 border-b border-black bg-[#d8ff3e] p-8 text-black md:border-b-0 md:border-r">
          <Image
            alt="2 Days Early"
            className="h-auto w-full max-w-[230px] object-contain object-left"
            height={75}
            priority
            src="/images/2-days-early-wordmark-2026-v4-nobg.png"
            width={360}
          />
          <div>
            <p className="sl-label mb-3">SECURE SIGN-IN</p>
            <h1 className="sl-display text-4xl font-black leading-none">Continue to 2 Days Early.</h1>
            <p className="sl-body mt-4 max-w-sm text-sm leading-relaxed">
              This account opens the private syndicate administration surface.
            </p>
          </div>
        </section>
        <section className="flex items-start justify-center bg-white p-6 md:p-10" aria-label="Sign-in options">
          <SignIn
            fallbackRedirectUrl="/admin"
            forceRedirectUrl="/admin"
            routing="hash"
          />
        </section>
      </div>
    </main>
  );
}

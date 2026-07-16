'use client';

import { SignIn } from '@clerk/nextjs';

export default function AdminLogin() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--carbon-bg)' }}
    >
      <SignIn routing="hash" fallbackRedirectUrl="/admin" />
    </div>
  );
}

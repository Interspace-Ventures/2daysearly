'use client';

import { SignOutButton } from '@clerk/nextjs';

export default function LogoutButton() {
  return (
    <SignOutButton redirectUrl="/">
      <button
        type="button"
        className="sl-nav-ghost sl-label font-bold"
        style={{ padding: '0.5rem 1rem' }}
      >
        Log out
      </button>
    </SignOutButton>
  );
}

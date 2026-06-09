'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.refresh();
      }}
      className="sl-nav-ghost sl-label font-bold"
      style={{ padding: '0.5rem 1rem' }}
    >
      Log out
    </button>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Login failed');
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--carbon-bg)' }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm p-6"
        style={{
          background: 'var(--carbon-surface)',
          border: '3px solid var(--carbon-border)',
          boxShadow: '8px 8px 0px 0px var(--carbon-shadow)',
        }}
      >
        <h1 className="sl-display font-extrabold mb-1" style={{ color: 'var(--carbon-text)', fontSize: '1.4rem' }}>
          Admin access
        </h1>
        <p className="sl-body mb-5" style={{ color: 'var(--carbon-muted)', fontSize: '0.9rem' }}>
          Enter the admin password to view applications.
        </p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-white text-black border-2 border-black px-3 py-2.5 text-base outline-none mb-3"
        />
        {error && (
          <p className="mb-3 text-sm font-medium" style={{ color: '#ff6b6b' }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="sl-nav-cta sl-label w-full font-bold"
          style={{ padding: '0.7rem 1.2rem' }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

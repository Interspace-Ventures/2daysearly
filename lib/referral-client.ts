'use client';

// Client-side referral capture. Reads `?ref=CODE` from the URL and persists it
// (localStorage + cookie) so the code survives the multi-step form and return
// visits. Kept separate from the server `lib/referral.ts` so node `crypto`/`db`
// never get bundled into the client.

export const REF_QUERY_PARAM = 'ref';
const REF_STORAGE_KEY = '2de_ref';
const REF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function normalize(raw: string | null | undefined): string {
  return (raw || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 64);
}

// Capture `?ref=CODE` from the current URL and persist it. Call once on load.
export function captureRefFromUrl(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const code = normalize(params.get(REF_QUERY_PARAM));
    if (code) storeRefCode(code);
  } catch {
    /* no-op */
  }
}

export function storeRefCode(code: string): void {
  const c = normalize(code);
  if (!c) return;
  try {
    window.localStorage.setItem(REF_STORAGE_KEY, c);
  } catch {
    /* ignore */
  }
  try {
    document.cookie = `${REF_STORAGE_KEY}=${c}; path=/; max-age=${REF_COOKIE_MAX_AGE}; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function getStoredRefCode(): string {
  if (typeof window === 'undefined') return '';
  try {
    const ls = window.localStorage.getItem(REF_STORAGE_KEY);
    if (ls) return normalize(ls);
  } catch {
    /* ignore */
  }
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${REF_STORAGE_KEY}=([^;]*)`));
    if (m) return normalize(decodeURIComponent(m[1]));
  } catch {
    /* ignore */
  }
  return '';
}

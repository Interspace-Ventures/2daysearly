import crypto from 'crypto';

export const ADMIN_COOKIE = 'tde_admin';

// Derives an opaque session token from the admin password. Because the
// password is secret, the hash is unguessable and needs no server-side store.
export function adminToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return crypto.createHash('sha256').update(`tde:${pw}`).digest('hex');
}

export function isAdminAuthed(cookieVal?: string): boolean {
  const token = adminToken();
  if (!token || !cookieVal) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(cookieVal);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

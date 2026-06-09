import { NextResponse } from 'next/server';
import { adminToken, ADMIN_COOKIE } from '@/lib/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: '' }));
  const pw = process.env.ADMIN_PASSWORD;

  if (!pw) {
    return NextResponse.json({ error: 'Admin access is not configured.' }, { status: 503 });
  }
  if (typeof password !== 'string' || password !== pw) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, adminToken()!, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return res;
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, SESSION_COOKIE } from '@/lib/adminSession';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const payload = verifySession(token);
  if (!payload) return NextResponse.json({ isAuthenticated: false, isAdmin: false });
  return NextResponse.json({ isAuthenticated: true, isAdmin: payload.role === 'admin', username: payload.username });
}
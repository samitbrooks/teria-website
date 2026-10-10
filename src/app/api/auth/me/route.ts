// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth-service';

export const runtime = 'edge';

function parseCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  const token = parseCookie(cookieHeader, 'admin_session');

  if (!token) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      uid: payload.id,
      email: payload.email,
      displayName: payload.name,
      role: payload.role,
    },
  });
}

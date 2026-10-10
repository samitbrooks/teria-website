// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  // Clear the cookie immediately
  response.headers.set(
    'Set-Cookie',
    'admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  );
  return response;
}

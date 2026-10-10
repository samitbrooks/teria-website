// src/app/api/donations/route.ts
import { NextResponse } from 'next/server';
import { getDonations, updateDonationStatus, createAuditLog } from '@/lib/d1';
import { verifySessionToken } from '@/lib/auth-service';

export const runtime = 'edge';

function parseCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export async function GET(request: Request) {
  try {
    const token = parseCookie(request.headers.get('cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const donations = await getDonations();
    return NextResponse.json({ success: true, donations });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const token = parseCookie(request.headers.get('cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Missing id or status' }, { status: 400 });
    }

    const ok = await updateDonationStatus(id, status);

    try {
      await createAuditLog('Update Donation', session.email, `Updated donation ${id} status to ${status}`);
    } catch {}

    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

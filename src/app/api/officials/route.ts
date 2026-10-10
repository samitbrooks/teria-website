// src/app/api/officials/route.ts
import { NextResponse } from 'next/server';
import { getOfficials, saveOfficial, deleteOfficial, createAuditLog } from '@/lib/d1';
import { verifySessionToken } from '@/lib/auth-service';

export const runtime = 'edge';

function parseCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export async function GET() {
  try {
    const officials = await getOfficials();
    return NextResponse.json({ success: true, officials });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = parseCookie(request.headers.get('cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const ok = await saveOfficial(body);

    try {
      await createAuditLog('Save Official', session.email, `Saved official: ${body.name}`);
    } catch {}

    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const token = parseCookie(request.headers.get('cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing id parameter' }, { status: 400 });
    }

    const ok = await deleteOfficial(id);

    try {
      await createAuditLog('Delete Official', session.email, `Deleted official: ${id}`);
    } catch {}

    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

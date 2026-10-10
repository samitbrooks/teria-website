// functions/api/audit.ts
import { verifySessionToken, parseCookie } from '../_shared/auth';

export const onRequestGet = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const res = await context.env.DB.prepare(
      'SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100'
    ).all();

    const logs = (res.results || []).map((r: any) => ({
      id: r.id,
      action: r.action,
      user: r.user_email,
      details: r.details || '',
      timestamp: r.created_at,
    }));

    return Response.json({ success: true, logs });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const onRequestPost = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await context.request.json();
    const id = body.id || `audit-${Date.now()}`;

    await context.env.DB.prepare(
      'INSERT INTO audit_logs (id, action, user_email, details) VALUES (?, ?, ?, ?)'
    )
      .bind(id, body.action, session.email, body.details || '')
      .run();

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

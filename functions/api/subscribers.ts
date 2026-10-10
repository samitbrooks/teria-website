// functions/api/subscribers.ts
import { verifySessionToken, parseCookie } from '../_shared/auth';

export const onRequestGet = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const res = await context.env.DB.prepare('SELECT * FROM subscribers ORDER BY created_at DESC').all();
    const subscribers = (res.results || []).map((r: any) => ({
      id: r.id,
      email: r.email,
      subscribedAt: r.created_at,
    }));
    return Response.json({ success: true, subscribers });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const onRequestDelete = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');
    await context.env.DB.prepare('DELETE FROM subscribers WHERE id = ?').bind(id).run();
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const onRequestPost = async (context: any) => {
  try {
    const { email } = await context.request.json();
    if (!email) {
      return Response.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    const existing = await context.env.DB.prepare('SELECT id FROM subscribers WHERE email = ? LIMIT 1')
      .bind(email)
      .first();

    if (existing) {
      return Response.json({ success: true, message: 'Already subscribed' });
    }

    const id = `sub-${Date.now()}`;
    await context.env.DB.prepare('INSERT INTO subscribers (id, email) VALUES (?, ?)')
      .bind(id, email)
      .run();

    return Response.json({ success: true, id });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

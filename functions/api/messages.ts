// functions/api/messages.ts
import { verifySessionToken, parseCookie } from '../_shared/auth';

export const onRequestGet = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const res = await context.env.DB.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
    const messages = (res.results || []).map((r: any) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      subject: r.subject || '',
      message: r.message,
      submittedAt: r.created_at,
      read: r.status === 'read',
    }));
    return Response.json({ success: true, messages });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const onRequestPatch = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id, read } = await context.request.json();
    await context.env.DB.prepare('UPDATE messages SET status = ? WHERE id = ?')
      .bind(read ? 'read' : 'unread', id)
      .run();
    return Response.json({ success: true });
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
    await context.env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(id).run();
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const onRequestPost = async (context: any) => {
  try {
    const body = await context.request.json();
    const id = body.id || `msg-${Date.now()}`;
    await context.env.DB.prepare(
      `INSERT INTO messages (id, name, email, phone, subject, message, status)
       VALUES (?, ?, ?, ?, ?, ?, 'unread')`
    )
      .bind(id, body.name, body.email, body.phone || '', body.subject || '', body.message)
      .run();
    return Response.json({ success: true, id });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

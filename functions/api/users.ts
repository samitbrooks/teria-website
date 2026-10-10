// functions/api/users.ts
import { verifySessionToken, parseCookie, hashPassword } from '../_shared/auth';

export const onRequestGet = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const res = await context.env.DB.prepare(
      'SELECT id, email, name, role, created_at FROM users ORDER BY created_at ASC'
    ).all();

    return Response.json({ success: true, users: res.results || [] });
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

    const { email, password, name, role } = await context.request.json();
    if (!email || !password || !name) {
      return Response.json(
        { success: false, message: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const password_hash = await hashPassword(password);
    const id = `user-${Date.now()}`;
    const userRole = role || 'admin';

    await context.env.DB.prepare(
      'INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)'
    )
      .bind(id, email.toLowerCase(), password_hash, name, userRole)
      .run();

    try {
      const auditId = `audit-${Date.now()}`;
      await context.env.DB.prepare(
        'INSERT INTO audit_logs (id, action, user_email, details) VALUES (?, ?, ?, ?)'
      )
        .bind(auditId, 'Create User', session.email, `Created admin user: ${email}`)
        .run();
    } catch {}

    return Response.json({
      success: true,
      user: {
        id,
        email: email.toLowerCase(),
        name,
        role: userRole,
      },
    });
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

    if (!id) {
      return Response.json({ success: false, message: 'Missing user id' }, { status: 400 });
    }

    await context.env.DB.prepare('DELETE FROM users WHERE id = ?').bind(id).run();

    try {
      const auditId = `audit-${Date.now()}`;
      await context.env.DB.prepare(
        'INSERT INTO audit_logs (id, action, user_email, details) VALUES (?, ?, ?, ?)'
      )
        .bind(auditId, 'Delete User', session.email, `Deleted user ID: ${id}`)
        .run();
    } catch {}

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

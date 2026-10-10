// functions/api/officials.ts
import { verifySessionToken, parseCookie } from '../_shared/auth';

export const onRequestGet = async (context: any) => {
  try {
    const res = await context.env.DB.prepare('SELECT * FROM officials ORDER BY order_index ASC').all();
    const officials = (res.results || []).map((r: any) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      imageUrl: r.image_url,
      imageHint: r.image_hint || '',
      order: r.order_index ?? 0,
    }));
    return Response.json({ success: true, officials });
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
    const id = body.id || `off-${Date.now()}`;

    await context.env.DB.prepare(
      `INSERT INTO officials (id, name, role, image_url, image_hint, order_index)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         name = excluded.name,
         role = excluded.role,
         image_url = excluded.image_url,
         image_hint = excluded.image_hint,
         order_index = excluded.order_index`
    )
      .bind(id, body.name, body.role, body.imageUrl || '', body.imageHint || '', body.order ?? 0)
      .run();

    return Response.json({ success: true, id });
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
    await context.env.DB.prepare('DELETE FROM officials WHERE id = ?').bind(id).run();
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

// functions/api/gallery.ts
import { verifySessionToken, parseCookie } from '../_shared/auth';

export const onRequestGet = async (context: any) => {
  try {
    const res = await context.env.DB.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all();
    const images = (res.results || []).map((r: any) => ({
      id: r.id,
      src: r.image_url,
      alt: r.title,
      imageHint: r.image_hint || '',
      createdAt: r.created_at,
    }));
    return Response.json({ success: true, images });
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
    const id = body.id || `gal-${Date.now()}`;

    await context.env.DB.prepare(
      `INSERT INTO gallery (id, title, image_url, image_hint, description)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(id, body.title, body.imageUrl, body.imageHint || '', body.description || '')
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
    await context.env.DB.prepare('DELETE FROM gallery WHERE id = ?').bind(id).run();
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

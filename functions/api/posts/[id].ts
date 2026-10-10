// functions/api/posts/[id].ts
import { verifySessionToken, parseCookie } from '../../_shared/auth';

function mapPost(row: any) {
  let galleryImages = [];
  if (row.gallery_images) {
    try {
      galleryImages = typeof row.gallery_images === 'string' ? JSON.parse(row.gallery_images) : row.gallery_images;
    } catch {}
  }
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    imageUrl: row.image_url,
    imageHint: row.image_hint || '',
    title: row.title,
    summary: row.summary,
    fullContent: row.full_content,
    date: row.date,
    galleryImages,
  };
}

export const onRequestGet = async (context: any) => {
  try {
    const id = context.params.id;
    const row = await context.env.DB.prepare('SELECT * FROM blog_posts WHERE id = ? LIMIT 1')
      .bind(id)
      .first();
    if (!row) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, post: mapPost(row) });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const onRequestPut = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const id = context.params.id;
    const body = await context.request.json();
    const galleryJson = JSON.stringify(body.galleryImages || []);

    await context.env.DB.prepare(
      `UPDATE blog_posts SET
         title = ?, slug = ?, category = ?, summary = ?, full_content = ?,
         image_url = ?, image_hint = ?, date = ?, gallery_images = ?
       WHERE id = ?`
    )
      .bind(
        body.title,
        body.slug,
        body.category,
        body.summary,
        body.fullContent,
        body.imageUrl,
        body.imageHint || '',
        body.date,
        galleryJson,
        id
      )
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

    const id = context.params.id;
    await context.env.DB.prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run();
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

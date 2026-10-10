// functions/api/posts.ts
import { verifySessionToken, parseCookie } from '../_shared/auth';

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
    const url = new URL(context.request.url);
    const limit = url.searchParams.get('limit');
    const slug = url.searchParams.get('slug');

    if (slug) {
      const row = await context.env.DB.prepare('SELECT * FROM blog_posts WHERE slug = ? LIMIT 1')
        .bind(slug)
        .first();
      if (!row) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
      return Response.json({ success: true, post: mapPost(row) });
    }

    const sql = limit
      ? 'SELECT * FROM blog_posts ORDER BY date DESC LIMIT ?'
      : 'SELECT * FROM blog_posts ORDER BY date DESC';
    const stmt = limit
      ? context.env.DB.prepare(sql).bind(parseInt(limit, 10))
      : context.env.DB.prepare(sql);

    const res = await stmt.all();
    const posts = (res.results || []).map(mapPost);
    return Response.json({ success: true, posts });
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
    const id = body.id || `post-${Date.now()}`;
    const galleryJson = JSON.stringify(body.galleryImages || []);

    await context.env.DB.prepare(
      `INSERT INTO blog_posts (id, slug, category, image_url, image_hint, title, summary, full_content, date, gallery_images)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        id,
        body.slug,
        body.category || 'General',
        body.imageUrl,
        body.imageHint || '',
        body.title,
        body.summary || '',
        body.fullContent || '',
        body.date || new Date().toISOString().split('T')[0],
        galleryJson
      )
      .run();

    return Response.json({ success: true, post: { ...body, id } });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

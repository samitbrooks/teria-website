// functions/api/settings.ts
import { verifySessionToken, parseCookie } from '../_shared/auth';

const defaultSettings = {
  contactEmail: 'teria.cbo@gmail.com',
  contactPhone1: '+254 795 185 979',
  contactPhone2: '+254 754 929 777',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  tiktokUrl: 'https://tiktok.com',
  twitterUrl: 'https://twitter.com',
  paystackPublicKey: '',
};

export const onRequestGet = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;

    let settings = { ...defaultSettings };

    try {
      const row = await context.env.DB.prepare('SELECT value FROM settings WHERE key = ? LIMIT 1')
        .bind('site')
        .first();

      if (row && row.value) {
        const parsed = JSON.parse(row.value);
        settings = { ...defaultSettings, ...parsed };
      }
    } catch (dbErr) {
      console.warn('DB settings read error:', dbErr);
    }

    if (!session) {
      const { paystackSecretKeyEncrypted, ...safeSettings } = settings as any;
      return Response.json({ success: true, settings: safeSettings });
    }

    return Response.json({ success: true, settings });
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

    // Get current settings to merge
    let current = { ...defaultSettings };
    try {
      const row = await context.env.DB.prepare('SELECT value FROM settings WHERE key = ? LIMIT 1')
        .bind('site')
        .first();
      if (row && row.value) {
        current = { ...defaultSettings, ...JSON.parse(row.value) };
      }
    } catch {}

    const updated = { ...current, ...body };
    const jsonStr = JSON.stringify(updated);

    await context.env.DB.prepare(
      `INSERT INTO settings (key, value) VALUES ('site', ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    )
      .bind(jsonStr)
      .run();

    // Record audit log
    try {
      const auditId = `audit-${Date.now()}`;
      await context.env.DB.prepare(
        'INSERT INTO audit_logs (id, action, user_email, details) VALUES (?, ?, ?, ?)'
      )
        .bind(auditId, 'Update Settings', session.email, 'Updated site settings')
        .run();
    } catch {}

    return Response.json({ success: true, settings: updated });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

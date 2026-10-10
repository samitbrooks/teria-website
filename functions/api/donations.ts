// functions/api/donations.ts
import { verifySessionToken, parseCookie } from '../_shared/auth';

export const onRequestGet = async (context: any) => {
  try {
    const token = parseCookie(context.request.headers.get('Cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const res = await context.env.DB.prepare('SELECT * FROM donations ORDER BY created_at DESC').all();
    return Response.json({ success: true, donations: res.results || [] });
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

    const { id, status } = await context.request.json();
    await context.env.DB.prepare('UPDATE donations SET status = ? WHERE id = ?').bind(status, id).run();
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const onRequestPost = async (context: any) => {
  try {
    const body = await context.request.json();
    const id = body.id || `don-${Date.now()}`;
    const donorName = body.donorName || body.donor_name || 'Anonymous';
    const donorEmail = body.donorEmail || body.donor_email || '';
    const amount = Number(body.amount || 0);
    const currency = body.currency || 'KES';
    const status = body.status || 'success';
    const reference = body.reference || '';

    await context.env.DB.prepare(
      `INSERT INTO donations (id, donor_name, donor_email, amount, currency, status, reference)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(id, donorName, donorEmail, amount, currency, status, reference)
      .run();

    return Response.json({ success: true, id });
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

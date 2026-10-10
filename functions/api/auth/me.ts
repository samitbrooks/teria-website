// functions/api/auth/me.ts
import { verifySessionToken, parseCookie } from '../../_shared/auth';

export const onRequestGet = async (context: any) => {
  const cookieHeader = context.request.headers.get('Cookie');
  const token = parseCookie(cookieHeader, 'admin_session');

  if (!token) {
    return Response.json({ authenticated: false, user: null });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return Response.json({ authenticated: false, user: null });
  }

  return Response.json({
    authenticated: true,
    user: {
      uid: session.id,
      email: session.email,
      displayName: session.name,
      role: session.role,
    },
  });
};

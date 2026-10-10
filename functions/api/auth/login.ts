// functions/api/auth/login.ts
import { verifyPassword, createSessionToken } from '../../_shared/auth';

const FALLBACK_ADMIN_EMAIL = 'samikidemi@gmail.com';
const FALLBACK_ADMIN_HASH = 'e04853b7d862984b0509b11e23ba94af3135a5712089bfffed9c3e78b7baa445';

export const onRequestPost = async (context: any) => {
  try {
    const { email, password } = await context.request.json();
    if (!email || !password) {
      return Response.json({ success: false, message: 'Email and password required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user: any = null;

    // 1. Check in D1 database
    if (context.env?.DB) {
      try {
        const dbResult = await context.env.DB.prepare(
          'SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1'
        ).bind(normalizedEmail).first();

        if (dbResult) {
          const isValid = await verifyPassword(password, dbResult.password_hash);
          if (isValid) {
            user = {
              id: dbResult.id,
              email: dbResult.email,
              name: dbResult.name,
              role: dbResult.role || 'admin',
            };
          }
        }
      } catch (err) {
        console.warn('D1 query error in login:', err);
      }
    }

    // 2. Fallback check for initial admin
    if (!user && normalizedEmail === FALLBACK_ADMIN_EMAIL) {
      const isValid = await verifyPassword(password, FALLBACK_ADMIN_HASH);
      if (isValid) {
        user = {
          id: 'admin-1',
          email: FALLBACK_ADMIN_EMAIL,
          name: 'Samuel Kidemi',
          role: 'admin',
        };
      }
    }

    if (!user) {
      return Response.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    // 3. Create session token
    const token = await createSessionToken(user);

    // 4. Record audit log
    if (context.env?.DB) {
      try {
        await context.env.DB.prepare(
          'INSERT INTO audit_logs (id, action, user_email, details) VALUES (?, ?, ?, ?)'
        ).bind(`audit-${Date.now()}`, 'Admin Login', user.email, 'Logged in to dashboard').run();
      } catch {}
    }

    const cookie = `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800; Secure`;
    return Response.json(
      {
        success: true,
        user: { uid: user.id, email: user.email, displayName: user.name, role: user.role },
      },
      {
        headers: { 'Set-Cookie': cookie },
      }
    );
  } catch (error: any) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};

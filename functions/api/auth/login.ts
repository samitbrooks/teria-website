// functions/api/auth/login.ts
import { verifyPassword, createSessionToken } from '../../_shared/auth';

const BUILTIN_ADMINS = [
  {
    id: 'admin-main',
    email: 'info@teriacbo.org',
    hash: '1c5e9f07b33953783237d16a3efb866981cd6e07b0120e84667621175e15ef58', // Teria@2030!@
    name: 'TERIA Administrator',
    role: 'admin',
  },
  {
    id: 'admin-1',
    email: 'samikidemi@gmail.com',
    hash: 'e04853b7d862984b0509b11e23ba94af3135a5712089bfffed9c3e78b7baa445', // Admin@12345
    name: 'Samuel Kidemi',
    role: 'admin',
  },
];

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

    // 2. Check built-in admin credentials
    if (!user) {
      const builtin = BUILTIN_ADMINS.find(a => a.email.toLowerCase() === normalizedEmail);
      if (builtin) {
        const isValid = await verifyPassword(password, builtin.hash);
        if (isValid) {
          user = {
            id: builtin.id,
            email: builtin.email,
            name: builtin.name,
            role: builtin.role,
          };

          // Synchronize/upsert to D1 users table
          if (context.env?.DB) {
            try {
              await context.env.DB.prepare(
                `INSERT INTO users (id, email, password_hash, name, role)
                 VALUES (?, ?, ?, ?, ?)
                 ON CONFLICT(id) DO UPDATE SET password_hash = excluded.password_hash`
              )
                .bind(builtin.id, builtin.email, builtin.hash, builtin.name, builtin.role)
                .run();
            } catch (syncErr) {
              console.warn('Could not sync user to D1:', syncErr);
            }
          }
        }
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

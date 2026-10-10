// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { getUserByEmail, createUser, createAuditLog } from '@/lib/d1';
import { verifyPassword, createSessionToken } from '@/lib/auth-service';

export const runtime = 'edge';

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

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    let authenticatedUser: { id: string; email: string; name: string; role: string } | null = null;

    // 1. Try finding user in Cloudflare D1
    try {
      const dbUser = await getUserByEmail(normalizedEmail);
      if (dbUser) {
        const isValid = await verifyPassword(password, dbUser.password_hash);
        if (isValid) {
          authenticatedUser = {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            role: dbUser.role,
          };
        }
      }
    } catch (err) {
      console.warn('D1 lookup warning, falling back to credentials check:', err);
    }

    // 2. Check built-in admin credentials
    if (!authenticatedUser) {
      const builtin = BUILTIN_ADMINS.find((a) => a.email.toLowerCase() === normalizedEmail);
      if (builtin) {
        const isFallbackValid = await verifyPassword(password, builtin.hash);
        if (isFallbackValid) {
          authenticatedUser = {
            id: builtin.id,
            email: builtin.email,
            name: builtin.name,
            role: builtin.role,
          };

          // Upsert to D1
          try {
            await createUser({
              id: builtin.id,
              email: builtin.email,
              name: builtin.name,
              role: builtin.role,
              password_hash: builtin.hash,
            });
          } catch {}
        }
      }
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 3. Create signed session token
    const token = await createSessionToken(authenticatedUser);

    // 4. Log audit event
    try {
      await createAuditLog('Admin Login', authenticatedUser.email, 'Logged into admin dashboard');
    } catch {}

    // 5. Return response with HTTP-only cookie
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieHeader = `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${
      isProduction ? '; Secure' : ''
    }`;

    const response = NextResponse.json({
      success: true,
      user: {
        uid: authenticatedUser.id,
        email: authenticatedUser.email,
        displayName: authenticatedUser.name,
        role: authenticatedUser.role,
      },
    });

    response.headers.set('Set-Cookie', cookieHeader);
    return response;
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'An internal error occurred during login.' },
      { status: 500 }
    );
  }
}

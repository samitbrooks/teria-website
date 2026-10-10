// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { getUserByEmail, createAuditLog } from '@/lib/d1';
import { verifyPassword, createSessionToken } from '@/lib/auth-service';

export const runtime = 'edge';

// Fallback initial admin credentials
const FALLBACK_ADMIN_EMAIL = 'samikidemi@gmail.com';
const FALLBACK_ADMIN_HASH = 'e04853b7d862984b0509b11e23ba94af3135a5712089bfffed9c3e78b7baa445'; // Admin@12345

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

    // 2. Fallback check for initial admin user
    if (!authenticatedUser && normalizedEmail === FALLBACK_ADMIN_EMAIL) {
      const isFallbackValid = await verifyPassword(password, FALLBACK_ADMIN_HASH);
      if (isFallbackValid) {
        authenticatedUser = {
          id: 'admin-1',
          email: FALLBACK_ADMIN_EMAIL,
          name: 'Samuel Kidemi',
          role: 'admin',
        };
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

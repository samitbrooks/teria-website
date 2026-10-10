// functions/_shared/auth.ts
// Shared authentication utilities for Cloudflare Pages Functions

const AUTH_SALT = 'teria_auth_salt_2026';
const JWT_SECRET = 'teria_secret_jwt_hmac_key_2026_super_secure';

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
}

function textToBuffer(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function base64UrlEncode(str: string): string {
  const base64 = btoa(str);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

export async function hashPassword(password: string): Promise<string> {
  const salted = password + AUTH_SALT;
  const hashBuffer = await crypto.subtle.digest('SHA-256', textToBuffer(salted));
  return bufferToHex(hashBuffer);
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const computedHash = await hashPassword(password);
  return computedHash.toLowerCase() === storedHash.toLowerCase();
}

export async function createSessionToken(
  user: { id: string; email: string; name: string; role?: string },
  expiresInSeconds = 7 * 24 * 60 * 60
): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: AdminSession = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'admin',
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    'raw',
    textToBuffer(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, textToBuffer(dataToSign));
  const encodedSignature = base64UrlEncode(
    String.fromCharCode(...new Uint8Array(signature))
  );

  return `${dataToSign}.${encodedSignature}`;
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      textToBuffer(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const binarySignature = base64UrlDecode(encodedSignature);
    const signatureBuffer = new Uint8Array(binarySignature.length);
    for (let i = 0; i < binarySignature.length; i++) {
      signatureBuffer[i] = binarySignature.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      textToBuffer(dataToSign)
    );

    if (!isValid) return null;

    const payload: AdminSession = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function parseCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
}

// src/lib/auth-service.ts
// Independent Authentication System for TERIA (Zero Firebase dependency)

const AUTH_SALT = process.env.AUTH_SALT || 'teria_auth_salt_2026';
const JWT_SECRET = process.env.JWT_SECRET || 'teria_secret_jwt_hmac_key_2026_super_secure';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AdminSessionPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
}

// Convert string to Uint8Array
function textToBuffer(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Convert buffer to hex string
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Base64URL encode/decode helpers
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

/**
 * Hash password using SHA-256 with consistent salt
 */
export async function hashPassword(password: string): Promise<string> {
  const salted = password + AUTH_SALT;
  const hashBuffer = await crypto.subtle.digest('SHA-256', textToBuffer(salted));
  return bufferToHex(hashBuffer);
}

/**
 * Verify a plain password against a stored SHA-256 hash
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const computedHash = await hashPassword(password);
  return computedHash.toLowerCase() === storedHash.toLowerCase();
}

/**
 * Sign session token using HMAC-SHA256 (Web Crypto)
 */
export async function createSessionToken(user: AdminUser, expiresInSeconds = 7 * 24 * 60 * 60): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: AdminSessionPayload = {
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

/**
 * Verify and decode an HMAC-SHA256 session token
 */
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
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

    // Decode signature
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

    const payload: AdminSessionPayload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload;
  } catch (error) {
    return null;
  }
}

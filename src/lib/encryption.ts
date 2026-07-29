// src/lib/encryption.ts
import CryptoJS from 'crypto-js';

const getSecretKey = (): string => {
  const secretKey = process.env.ENCRYPTION_KEY;
  if (!secretKey) {
    throw new Error('ENCRYPTION_KEY environment variable is not set. Please provide a long, random, secret string.');
  }
  return secretKey;
};

export function encrypt(text: string): string {
  if (!text) return '';
  const secretKey = getSecretKey();
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export function decrypt(ciphertext: string): string {
  if (!ciphertext) return '';
  const secretKey = getSecretKey();
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

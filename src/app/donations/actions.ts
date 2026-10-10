// src/app/donations/actions.ts
'use server';

import { getSiteSettings, createDonation } from '@/lib/d1';
import { decrypt } from '@/lib/encryption';
import { revalidatePath } from 'next/cache';

export async function getPaystackPublicKey(): Promise<string> {
  if (process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
    return process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  }
  try {
    const settings = await getSiteSettings();
    if (settings?.paystackPublicKey) {
      return settings.paystackPublicKey;
    }
  } catch (error) {
    console.error('Error reading Paystack public key from settings:', error);
  }
  return '';
}

async function getPaystackSecretKey(): Promise<string> {
  // 1. Try to get the key from D1 settings first
  try {
    const settings = await getSiteSettings();
    if (settings.paystackSecretKeyEncrypted) {
      try {
        const decryptedKey = decrypt(settings.paystackSecretKeyEncrypted);
        if (decryptedKey) return decryptedKey;
      } catch (error) {
        console.error('Failed to decrypt key from settings, falling back to ENV.', error);
      }
    }
    if ((settings as any).paystackSecretKey) {
      return (settings as any).paystackSecretKey;
    }
  } catch (error) {
    console.error('Failed to fetch settings from D1:', error);
  }

  // 2. Fallback to environment variable
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Paystack secret key is not configured in environment variables or database.');
  }
  return secretKey;
}

export async function verifyDonation(reference: string) {
  try {
    const secretKey = await getPaystackSecretKey();

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to connect to Paystack to verify transaction.');
    }

    const data = await response.json();

    if (data.status && data.data.status === 'success') {
      // Payment is successful, save to D1 database
      await createDonation({
        name: data.data.metadata?.name || 'Anonymous',
        email: data.data.customer?.email || '',
        amount: data.data.amount, // Amount is in kobo/cents
        currency: data.data.currency || 'KES',
        reference: data.data.reference,
        status: 'success',
      });

      revalidatePath('/admin/donations');

      return { success: true, message: 'Donation verified and recorded successfully.' };
    } else {
      // Payment was not successful
      return { success: false, message: data.data.gateway_response || 'Payment not successful.' };
    }
  } catch (error: any) {
    console.error('Donation verification error:', error);
    return { success: false, message: error.message || 'An unexpected error occurred during verification.' };
  }
}

// src/app/donations/actions.ts
'use server';

import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { decrypt } from '@/lib/encryption';
import type { SiteSettings } from '@/types';
import { revalidatePath } from 'next/cache';

async function getPaystackSecretKey(): Promise<string> {
  // 1. Try to get the key from Firestore settings first
  const settingsRef = doc(db, 'settings', 'site');
  const docSnap = await getDoc(settingsRef);

  if (docSnap.exists()) {
    const settings = docSnap.data() as SiteSettings;
    if (settings.paystackSecretKeyEncrypted) {
      try {
        const decryptedKey = decrypt(settings.paystackSecretKeyEncrypted);
        if (decryptedKey) return decryptedKey;
      } catch (error) {
        console.error("Failed to decrypt key from Firestore, falling back to ENV.", error);
      }
    }
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
      // Payment is successful, save to Firestore
      const donationData = {
        name: data.data.metadata.name || 'Anonymous',
        email: data.data.customer.email,
        amount: data.data.amount, // Amount is in kobo/cents
        currency: data.data.currency,
        reference: data.data.reference,
        status: 'success',
        createdAt: serverTimestamp(),
      };
      
      await addDoc(collection(db, 'donations'), donationData);
      
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

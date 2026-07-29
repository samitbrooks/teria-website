// src/app/admin/settings/paystack/actions.ts
'use server';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { z } from 'zod';
import { encrypt } from '@/lib/encryption';
import { revalidatePath } from 'next/cache';
import { logAudit } from '@/lib/audit';

const paystackSettingsSchema = z.object({
  paystackPublicKey: z.string().refine(val => val === '' || val.startsWith('pk_'), 'Must be a valid Paystack public key or empty.'),
  paystackSecretKey: z.string().refine(val => val === '' || val.startsWith('sk_'), 'Must be a valid Paystack secret key or empty.'),
});

export interface UpdatePaystackKeysResponse {
  success: boolean;
  message: string;
}

export async function getEnvKeys() {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
  const secretKey = process.env.PAYSTACK_SECRET_KEY || '';
  
  // Mask the secret key for security
  const maskedSecretKey = secretKey ? `${secretKey.substring(0, 8)}...${secretKey.substring(secretKey.length - 4)}` : '';

  return { publicKey, maskedSecretKey };
}


export async function updatePaystackKeys(formData: FormData, userEmail: string): Promise<UpdatePaystackKeysResponse> {
  const rawData = {
    paystackPublicKey: formData.get('paystackPublicKey'),
    paystackSecretKey: formData.get('paystackSecretKey'),
  };

  const validationResult = paystackSettingsSchema.safeParse(rawData);

  if (!validationResult.success) {
    return { success: false, message: validationResult.error.issues[0].message };
  }

  const { paystackPublicKey, paystackSecretKey } = validationResult.data;

  try {
    const settingsRef = doc(db, 'settings', 'site');
    
    // Encrypt the secret key before storing it
    const paystackSecretKeyEncrypted = paystackSecretKey ? encrypt(paystackSecretKey) : '';

    await setDoc(settingsRef, {
      paystackPublicKey,
      paystackSecretKeyEncrypted,
    }, { merge: true });
    
    await logAudit('update_paystack_keys', userEmail, 'Updated Paystack API keys from database.');

    // Revalidate paths that might use these keys
    revalidatePath('/donate');

    return { success: true, message: 'Paystack keys updated successfully.' };

  } catch (error) {
    console.error('Error updating Paystack keys:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

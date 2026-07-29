// src/app/admin/donations/_components/donation-actions.ts
'use server';

import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { logAudit } from '@/lib/audit';

const donationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  amount: z.coerce.number().int().min(0, 'Amount must be a positive number'),
  status: z.enum(['success', 'reversed']),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export async function updateDonation(id: string, data: DonationFormValues, modifiedBy: string) {
  const validation = donationSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: validation.error.issues[0].message };
  }

  const donationRef = doc(db, 'donations', id);
  try {
    await updateDoc(donationRef, {
      ...validation.data,
      modifiedAt: serverTimestamp(),
      modifiedBy: modifiedBy,
    });
    await logAudit('update_donation', modifiedBy, `Updated donation record for ${validation.data.email} (ID: ${id})`);
    revalidatePath('/admin/donations');
    return { success: true };
  } catch (error) {
    console.error("Error updating donation:", error);
    return { success: false, message: 'Failed to update donation.' };
  }
}

export async function deleteDonation(id: string, userEmail: string) {
  const donationRef = doc(db, 'donations', id);
  try {
    await deleteDoc(donationRef);
    await logAudit('delete_donation', userEmail, `Deleted donation record (ID: ${id})`);
    revalidatePath('/admin/donations');
    return { success: true };
  } catch (error) {
    console.error("Error deleting donation:", error);
    return { success: false, message: 'Failed to delete donation.' };
  }
}

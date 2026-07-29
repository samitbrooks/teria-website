// src/lib/audit.ts
'use server';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

/**
 * Logs an administrative action to the auditLog collection in Firestore.
 * @param action - A short, snake_cased string describing the action (e.g., 'create_post', 'delete_user').
 * @param user - The email or UID of the user performing the action.
 * @param details - A human-readable string with more context about the action.
 */
export async function logAudit(action: string, user: string, details: string) {
  try {
    await addDoc(collection(db, 'auditLog'), {
      action,
      user,
      details,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to write to audit log:", error);
    // In a real application, you might want more robust error handling here,
    // like sending an alert to a monitoring service.
  }
}

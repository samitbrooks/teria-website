// src/lib/audit.ts
'use server';

import { createAuditLog } from '@/lib/d1';

/**
 * Logs an administrative action to the audit_logs table in Cloudflare D1.
 * @param action - A short string describing the action (e.g., 'create_post', 'delete_user').
 * @param user - The email of the admin performing the action.
 * @param details - A human-readable string with more context about the action.
 */
export async function logAudit(action: string, user: string, details: string) {
  try {
    await createAuditLog(action, user, details);
  } catch (error) {
    console.error('Failed to write to audit log:', error);
  }
}

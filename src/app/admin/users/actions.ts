// src/app/admin/users/actions.ts
'use server';

import { adminAuth } from '@/lib/firebase/admin';

export async function listUsers() {
  try {
    const userRecords = await adminAuth.listUsers();
    // We need to serialize the data to pass it from server to client component
    return userRecords.users.map(user => user.toJSON());
  } catch (error) {
    console.error('Error listing users:', error);
    // Throw a serializable error
    throw new Error('Failed to list users from the server.');
  }
}

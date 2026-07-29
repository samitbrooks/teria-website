// src/app/admin/users/actions.ts
'use server';

import admin from 'firebase-admin';
import path from 'path';

const serviceAccountPath = path.resolve(process.cwd(), 'public', 'serviceaccount.json');

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error in user actions', error.stack);
  }
}

export async function listUsers() {
  try {
    const userRecords = await admin.auth().listUsers();
    // We need to serialize the data to pass it from server to client component
    return userRecords.users.map(user => user.toJSON());
  } catch (error) {
    console.error('Error listing users:', error);
    // Throw a serializable error
    throw new Error('Failed to list users from the server.');
  }
}

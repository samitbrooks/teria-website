import admin from 'firebase-admin';
import path from 'path';

// This is a more robust way to find the project root and then the file.
const serviceAccountPath = path.resolve(process.cwd(), 'public', 'serviceaccount.json');

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export default admin.firestore();

// To run this script:
// 1. Make sure your service account file is at /public/serviceaccount.json
// 2. Use the command: npx tsx src/scripts/seed-db.ts

import admin from 'firebase-admin';
import { blogPostsToSeed } from '../lib/blog-posts';
import path from 'path';

// Use the service account file for initialization
const serviceAccountPath = path.resolve(process.cwd(), 'public', 'serviceaccount.json');

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
    process.exit(1);
  }
}

const db = admin.firestore();

async function seedDatabase() {
  const postsCollection = db.collection('blogPosts');
  console.log('Starting to seed blog posts...');

  for (const post of blogPostsToSeed) {
    try {
      // Check if a post with the same slug already exists
      const existingPostQuery = await postsCollection.where('slug', '==', post.slug).limit(1).get();

      if (existingPostQuery.empty) {
        await postsCollection.add(post);
        console.log(`Added post: "${post.title}"`);
      } else {
        console.log(`Skipped post (slug already exists): "${post.title}"`);
      }
    } catch (error) {
      console.error(`Error adding post "${post.title}":`, error);
    }
  }

  console.log('Database seeding completed.');
}

seedDatabase().then(() => {
  console.log('Script finished.');
  process.exit(0);
}).catch((error) => {
  console.error('An unhandled error occurred:', error);
  process.exit(1);
});

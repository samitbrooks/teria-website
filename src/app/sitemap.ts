import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client'; // Assuming client SDK is okay for build time, or use Admin SDK
import type { BlogPostTeaserItem } from '@/types';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://teriacbo.org';

  // Get all blog post routes from Firestore
  const postsCollection = collection(db, 'blogPosts');
  const postsSnapshot = await getDocs(postsCollection);
  const postsData = postsSnapshot.docs.map(doc => doc.data() as BlogPostTeaserItem);

  const blogPostUrls = postsData.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Define all static page routes
  const staticRoutes = [
    '',
    '/about',
    '/focus-areas',
    '/impact',
    '/blog',
    '/donations',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ].map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticRoutes, ...blogPostUrls];
}

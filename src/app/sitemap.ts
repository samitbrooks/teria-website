// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/d1';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://teriacbo.org';

  // Get all blog post routes from D1 database
  let blogPostUrls: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogPostUrls = posts.map(post => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.warn('Failed to load posts for sitemap:', err);
  }

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

// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { getBlogPosts, getBlogPostBySlug, createBlogPost, createAuditLog } from '@/lib/d1';
import { verifySessionToken } from '@/lib/auth-service';

export const runtime = 'edge';

function parseCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    if (slug) {
      const post = await getBlogPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, post });
    }

    const posts = await getBlogPosts(limit);
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = parseCookie(request.headers.get('cookie'), 'admin_session');
    const session = token ? await verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const newPost = await createBlogPost(body);

    try {
      await createAuditLog('Create Post', session.email, `Created post: ${newPost.title}`);
    } catch {}

    return NextResponse.json({ success: true, post: newPost });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

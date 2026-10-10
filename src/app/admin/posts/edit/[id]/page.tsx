// src/app/admin/posts/edit/[id]/page.tsx
'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PostForm from '../../_components/post-form';
import type { BlogPostTeaserItem } from '@/types';
import { Loader2 } from 'lucide-react';

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const [post, setPost] = useState<BlogPostTeaserItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/posts/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success && data.post) {
          setPost(data.post);
        }
      })
      .catch(err => console.error('Error fetching post:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
        <CardDescription>Update the details of your blog post.</CardDescription>
      </CardHeader>
      <CardContent>
        {post ? <PostForm post={post} /> : <p>Post not found.</p>}
      </CardContent>
    </Card>
  );
}

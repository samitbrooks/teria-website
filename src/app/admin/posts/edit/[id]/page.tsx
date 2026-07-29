// src/app/admin/posts/edit/[id]/page.tsx
'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
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
    const fetchPost = async () => {
      const docRef = doc(db, 'blogPosts', params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() } as BlogPostTeaserItem);
      } else {
        // Handle post not found
        console.error("No such document!");
      }
      setLoading(false);
    };

    fetchPost();
  }, [params.id]);

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
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

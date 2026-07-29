// src/app/admin/posts/new/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PostForm from '../_components/post-form';

export default function NewPostPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>Fill out the form below to publish a new blog post.</CardDescription>
      </CardHeader>
      <CardContent>
        <PostForm />
      </CardContent>
    </Card>
  );
}

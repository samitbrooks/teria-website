'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase/client';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';
import type { BlogPostTeaserItem } from '@/types';
import { useState } from 'react';
import { Loader2, UploadCloud } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { logAudit } from '@/lib/audit';
import { Progress } from '@/components/ui/progress';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.string().min(2, 'Category is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  fullContent: z.string().min(20, 'Full content must be at least 20 characters'),
  image: z.custom<FileList>().optional(),
  imageUrl: z.string().optional(),
  imageHint: z.string().min(2, 'Image hint is required'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' }),
  slug: z.string().min(3, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
}).refine(data => data.image || data.imageUrl, {
  message: "Either an image upload or an image URL is required.",
  path: ["image"],
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: BlogPostTeaserItem;
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: post || {
      title: '',
      category: '',
      summary: '',
      fullContent: '',
      imageUrl: '',
      imageHint: '',
      date: new Date().toISOString().split('T')[0],
      slug: '',
    },
  });
  
  const imageFileRef = form.register("image");

  const generateSlug = () => {
    const title = form.getValues('title');
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    form.setValue('slug', slug);
  };

  const onSubmit = async (data: PostFormValues) => {
    if (!user?.email) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to save a post.' });
        return;
    }
    setLoading(true);
    setUploadProgress(0);

    let finalImageUrl = post?.imageUrl;
    let storagePath = post?.storagePath;

    try {
      // Handle image upload if a new image is provided
      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        storagePath = `blogImages/${fileName}`;
        const storageRef = ref(storage, storagePath);
        
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        finalImageUrl = await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
            (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            (error) => {
                console.error("Upload Error:", error);
                toast({ variant: 'destructive', title: 'Image Upload Failed', description: error.message });
                reject(error);
            },
            () => getDownloadURL(uploadTask.snapshot.ref).then(resolve)
            );
        });
      }

      const postData = {
          ...data,
          imageUrl: finalImageUrl,
          storagePath: storagePath,
          image: undefined, // Don't save the file object to Firestore
      };
      
      if (post) {
        // Update existing post
        const postRef = doc(db, 'blogPosts', post.id);
        await setDoc(postRef, postData, { merge: true });
        await logAudit('update_post', user.email, `Updated post: "${data.title}"`);
        toast({ title: 'Success', description: 'Post updated successfully!' });
      } else {
        // Create new post
        await addDoc(collection(db, 'blogPosts'), postData);
        await logAudit('create_post', user.email, `Created new post: "${data.title}"`);
        toast({ title: 'Success', description: 'Post created successfully!' });
      }
      router.push('/admin/posts');
      router.refresh();
    } catch (error) {
      console.error("Error saving post: ", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save post.' });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Blog Post Title" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <div className="flex items-end gap-2">
            <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem className="flex-1"><FormLabel>Slug</FormLabel><FormControl><Input placeholder="blog-post-title" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="button" variant="outline" onClick={generateSlug}>Generate</Button>
        </div>

        <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem><FormLabel>Category</FormLabel><FormControl><Input placeholder="e.g., Community Stories" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem><FormLabel>Publication Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <FormField control={form.control} name="image" render={({ field }) => (
          <FormItem>
            <FormLabel>Featured Image (Upload New)</FormLabel>
            <FormControl>
                <Input type="file" {...imageFileRef} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {loading && uploadProgress > 0 && <Progress value={uploadProgress} />}
        <FormField control={form.control} name="imageUrl" render={({ field }) => (
            <FormItem><FormLabel>Or, use existing Image URL</FormLabel><FormControl><Input placeholder="https://example.com/image.jpg" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
         <FormField control={form.control} name="imageHint" render={({ field }) => (
            <FormItem><FormLabel>Image Hint</FormLabel><FormControl><Input placeholder="e.g., community event" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="summary" render={({ field }) => (
            <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea placeholder="A short summary of the blog post..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="fullContent" render={({ field }) => (
            <FormItem><FormLabel>Full Content</FormLabel><FormControl><Textarea placeholder="The full content of the blog post. You can use markdown." rows={10} {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {post ? 'Update Post' : 'Create Post'}
            </Button>
        </div>
      </form>
    </Form>
  );
}

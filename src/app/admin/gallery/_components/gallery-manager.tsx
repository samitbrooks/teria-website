// src/app/admin/gallery/_components/gallery-manager.tsx
'use client';

import { useState, useEffect } from 'react';
import type { GalleryImageItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Loader2, Trash2, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/hooks/use-auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const imageSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  alt: z.string().min(1, { message: 'Alt text is required.' }),
  imageHint: z.string().min(1, { message: 'Image hint is required.' }),
});

type ImageFormValues = z.infer<typeof imageSchema>;

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema),
    defaultValues: { image: undefined, alt: '', imageHint: '' },
  });

  const imageFileRef = form.register('image');

  const fetchImages = () => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.images)) {
          setImages(data.images);
        }
      })
      .catch(err => console.error('Error fetching gallery:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onSubmit = async (data: ImageFormValues) => {
    if (!user?.email) {
      toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be logged in to upload images.' });
      return;
    }
    setIsSubmitting(true);
    setUploadProgress(20);

    try {
      const file = data.image[0];
      const formData = new FormData();
      formData.append('file', file);

      setUploadProgress(50);
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.url) {
        throw new Error(uploadData.message || 'Image upload failed');
      }

      setUploadProgress(80);

      const saveRes = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.alt,
          imageUrl: uploadData.url,
          imageHint: data.imageHint,
          description: data.alt,
        }),
      });

      if (!saveRes.ok) {
        throw new Error('Failed to save gallery item');
      }

      toast({ title: 'Success', description: 'Image added to gallery.' });
      form.reset();
      fetchImages();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to add image.' });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (image: GalleryImageItem) => {
    if (!user?.email) {
      toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be logged in to delete images.' });
      return;
    }
    try {
      const res = await fetch(`/api/gallery?id=${image.id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Success', description: 'Image removed from gallery.' });
        setImages(prev => prev.filter(img => img.id !== image.id));
      } else {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to remove image.' });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to remove image.' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg">
          <h3 className="text-lg font-medium">Add New Image</h3>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image File</FormLabel>
                <FormControl>
                  <Input type="file" {...imageFileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alternative Text (for accessibility)</FormLabel>
                <FormControl>
                  <Input placeholder="A description of the image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageHint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Hint (for AI)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. community event" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isSubmitting && <Progress value={uploadProgress} className="w-full" />}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? `Uploading... ${Math.round(uploadProgress)}%` : 'Upload Image'}
          </Button>
        </form>
      </Form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group border rounded-lg overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={300}
              className="object-cover w-full h-48"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this image from the gallery. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(image)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

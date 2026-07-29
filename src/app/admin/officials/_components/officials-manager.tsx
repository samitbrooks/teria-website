// src/app/admin/officials/_components/officials-manager.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/client';
import { v4 as uuidv4 } from 'uuid';
import type { Official } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Trash2, PlusCircle, Edit, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '@/hooks/use-auth';
import { logAudit } from '@/lib/audit';
import { Progress } from '@/components/ui/progress';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const officialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  image: z.custom<FileList>().optional(),
  imageUrl: z.string().optional(),
  imageHint: z.string().min(1, 'Image hint is required'),
  order: z.coerce.number().int().min(0, 'Order must be a positive number'),
}).refine(data => data.image || data.imageUrl, {
  message: "Either an image upload or an image URL is required.",
  path: ["image"],
});

type OfficialFormValues = z.infer<typeof officialSchema>;

interface OfficialFormProps {
  official?: Official;
  onFinished: () => void;
}

function OfficialForm({ official, onFinished }: OfficialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();

  const form = useForm<OfficialFormValues>({
    resolver: zodResolver(officialSchema),
    defaultValues: official || { name: '', role: '', imageUrl: '', imageHint: '', order: 0 },
  });
  
  const imageFileRef = form.register("image");

  const onSubmit = async (data: OfficialFormValues) => {
    if (!user?.email) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.' });
      return;
    }
    setIsSubmitting(true);
    setUploadProgress(0);

    let finalImageUrl = official?.imageUrl;
    let storagePath = official?.storagePath;

    if (data.image && data.image.length > 0) {
      const file = data.image[0];
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      storagePath = `officials/${fileName}`;
      const storageRef = ref(storage, storagePath);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      finalImageUrl = await new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
          (error) => {
            console.error("Upload error", error);
            toast({ variant: 'destructive', title: 'Upload Error', description: 'Failed to upload image.' });
            reject(error);
          },
          () => getDownloadURL(uploadTask.snapshot.ref).then(resolve)
        );
      });
    }

    try {
      const officialData = {
        name: data.name,
        role: data.role,
        imageUrl: finalImageUrl,
        imageHint: data.imageHint,
        order: data.order,
        storagePath: storagePath,
      };

      if (official) {
        await updateDoc(doc(db, 'officials', official.id!), officialData);
        await logAudit('update_official', user.email, `Updated official: ${data.name}`);
        toast({ title: 'Success', description: 'Official updated.' });
      } else {
        await addDoc(collection(db, 'officials'), officialData);
        await logAudit('create_official', user.email, `Created official: ${data.name}`);
        toast({ title: 'Success', description: 'Official added.' });
      }
      onFinished();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save official.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="role" render={({ field }) => (
          <FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
         <FormField control={form.control} name="image" render={({ field }) => (
          <FormItem>
            <FormLabel>New Image (optional)</FormLabel>
            <FormControl><Input type="file" {...imageFileRef} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {isSubmitting && uploadProgress > 0 && <Progress value={uploadProgress} />}
        <FormField control={form.control} name="imageUrl" render={({ field }) => (
          <FormItem><FormLabel>Image URL (if not uploading)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="imageHint" render={({ field }) => (
            <FormItem><FormLabel>Image Hint</FormLabel><FormControl><Input placeholder="e.g. person portrait" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="order" render={({ field }) => (
          <FormItem><FormLabel>Display Order</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (official ? <Edit className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />)}
          {isSubmitting ? 'Saving...' : (official ? 'Update Official' : 'Add Official')}
        </Button>
      </form>
    </Form>
  );
}


export default function OfficialsManager() {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const officialsCollection = collection(db, 'officials');
    const q = query(officialsCollection, orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const officialsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Official));
      setOfficials(officialsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (official: Official) => {
    if (!user?.email) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.' });
      return;
    }
    try {
      await deleteDoc(doc(db, 'officials', official.id!));
      if (official.storagePath) {
        await deleteObject(ref(storage, official.storagePath));
      }
      await logAudit('delete_official', user.email, `Deleted official: ${official.name}`);
      toast({ title: 'Success', description: 'Official removed.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to remove official.' });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Official</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Official</DialogTitle></DialogHeader>
          <OfficialForm onFinished={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {officials.map((official) => (
          <div key={official.id} className="border rounded-lg p-4 space-y-2 text-center">
            <Image src={official.imageUrl} alt={official.name} width={100} height={100} className="rounded-full mx-auto" />
            <h4 className="font-semibold">{official.name}</h4>
            <p className="text-sm text-muted-foreground">{official.role}</p>
            <div className="flex justify-center gap-2 pt-2">
              <Dialog>
                <DialogTrigger asChild><Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-1" /> Edit</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Edit Official</DialogTitle></DialogHeader>
                  <OfficialForm official={official} onFinished={() => {
                    // Find a better way to close the dialog if needed
                  }} />
                </DialogContent>
              </Dialog>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4 mr-1" /> Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete this official.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(official)}>Delete</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

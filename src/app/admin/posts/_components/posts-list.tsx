'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase/client';
import { ref, deleteObject } from 'firebase/storage';
import type { BlogPostTeaserItem } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { Loader2, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { logAudit } from '@/lib/audit';

export default function PostsList() {
  const [posts, setPosts] = useState<BlogPostTeaserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'blogPosts'), (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPostTeaserItem));
      // Sort by date descending
      postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (post: BlogPostTeaserItem) => {
    if (!user?.email) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to perform this action.' });
      return;
    }
    try {
      // Delete Firestore document
      await deleteDoc(doc(db, 'blogPosts', post.id));

      // If the post has an image stored in Firebase Storage, delete it
      if (post.storagePath) {
        const imageRef = ref(storage, post.storagePath);
        await deleteObject(imageRef);
      }
      
      await logAudit('delete_post', user.email, `Deleted post: "${post.title}"`);
      toast({ title: 'Success', description: 'Blog post deleted successfully.' });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete blog post.' });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="overflow-x-auto">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {posts.map((post) => (
            <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell><Badge variant="secondary">{post.category}</Badge></TableCell>
                <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/posts/edit/${post.id}`}>
                    <Edit className="h-4 w-4" />
                    </Link>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the blog post and its associated image from storage.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(post)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}

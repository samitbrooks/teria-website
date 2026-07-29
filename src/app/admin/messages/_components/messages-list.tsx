// src/app/admin/messages/_components/messages-list.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { ContactSubmission } from '@/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, MailOpen, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

export default function MessagesList() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const messagesCollection = collection(db, 'contactSubmissions');
    const q = query(messagesCollection, orderBy('submittedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission));
      setMessages(messagesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    const messageRef = doc(db, 'contactSubmissions', id);
    try {
      await updateDoc(messageRef, { read: !currentStatus });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update message status.' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'contactSubmissions', id));
      toast({ title: 'Success', description: 'Message deleted successfully.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete message.' });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (messages.length === 0) {
    return <p className="text-center text-muted-foreground">No messages received yet.</p>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {messages.map((message) => (
        <AccordionItem value={message.id} key={message.id}>
          <Card className={`mb-2 ${message.read ? 'bg-gray-50' : 'bg-white'}`}>
            <AccordionTrigger className="p-4 hover:no-underline">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-4 text-left">
                  {message.read ? <MailOpen className="h-5 w-5 text-gray-400" /> : <Mail className="h-5 w-5 text-primary" />}
                  <div>
                    <p className={`font-medium ${message.read ? 'text-gray-600' : 'text-gray-900'}`}>{message.name} <span className="font-normal text-gray-500">&lt;{message.email}&gt;</span></p>
                    <p className={`text-sm ${message.read ? 'text-gray-500' : 'text-gray-800'}`}>{message.subject}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 pr-4">
                  {format(message.submittedAt.toDate(), 'PPP p')}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 border-t">
              <p className="text-base text-gray-700 whitespace-pre-wrap mb-4">{message.message}</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => toggleReadStatus(message.id, message.read || false)}>
                  {message.read ? 'Mark as Unread' : 'Mark as Read'}
                </Button>
                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this message. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(message.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </AccordionContent>
          </Card>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

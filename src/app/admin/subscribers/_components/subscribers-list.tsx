// src/app/admin/subscribers/_components/subscribers-list.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { NewsletterSubscriber } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Download } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SubscribersList() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const subscribersCollection = collection(db, 'newsletterSubscribers');
    const q = query(subscribersCollection, orderBy('subscribedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subscribersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsletterSubscriber));
      setSubscribers(subscribersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const exportToCSV = () => {
    const csvRows = [
      ['Email', 'Subscription Date'], // CSV Header
      ...filteredSubscribers.map(sub => [sub.email, format(sub.subscribedAt.toDate(), 'yyyy-MM-dd HH:mm:ss')])
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + csvRows.map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <Input
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={exportToCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {filteredSubscribers.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Email Address</TableHead>
                <TableHead className="text-right">Subscription Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">{format(subscriber.subscribedAt.toDate(), 'PPP p')}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      )}
    </div>
  );
}

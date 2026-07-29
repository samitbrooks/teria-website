// src/app/admin/messages/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MessagesList from './_components/messages-list';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function MessagesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>View and manage messages submitted through your website's contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <MessagesList />
        </Suspense>
      </CardContent>
    </Card>
  );
}

// src/app/admin/subscribers/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SubscribersList from './_components/subscribers-list';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function SubscribersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Subscribers</CardTitle>
        <CardDescription>View and export your newsletter subscriber list.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <SubscribersList />
        </Suspense>
      </CardContent>
    </Card>
  );
}

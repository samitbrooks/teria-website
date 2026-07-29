// src/app/admin/officials/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OfficialsManager from './_components/officials-manager';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function OfficialsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Officials</CardTitle>
        <CardDescription>
          Manage the officials displayed in the carousel on the "About Us" page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <OfficialsManager />
        </Suspense>
      </CardContent>
    </Card>
  );
}

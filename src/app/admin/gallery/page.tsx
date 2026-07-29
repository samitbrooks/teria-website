// src/app/admin/gallery/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GalleryManager from './_components/gallery-manager';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function GalleryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Impact Page Gallery</CardTitle>
        <CardDescription>
          Manage the images displayed in the gallery on the "Our Impact" page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <GalleryManager />
        </Suspense>
      </CardContent>
    </Card>
  );
}

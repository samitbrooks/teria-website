// src/app/admin/audit-log/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuditLogList from './_components/audit-log-list';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function AuditLogPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
        <CardDescription>
          A record of all administrative actions taken within the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <AuditLogList />
        </Suspense>
      </CardContent>
    </Card>
  );
}

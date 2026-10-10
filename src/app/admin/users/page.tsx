// src/app/admin/users/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UsersList from './_components/users-list';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import Link from 'next/link';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View all admin users for this dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <UsersList />
        </CardContent>
      </Card>
       <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Cloudflare D1 User Security</AlertTitle>
        <AlertDescription>
          Admin accounts are securely stored in your Cloudflare D1 database with SHA-256 salted hashes. You can add or manage administrators using the dashboard or via your Cloudflare D1 SQL console.
        </AlertDescription>
      </Alert>
    </div>
  );
}

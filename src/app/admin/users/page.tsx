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
        <AlertTitle>How to Add New Users</AlertTitle>
        <AlertDescription>
          For security, new admin users must be added through the Firebase Console. Go to the{" "}
          <Link href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
            Firebase Console
          </Link>
          , navigate to the **Authentication** section, and add a new user with an email and password. They will then be able to log in here.
        </AlertDescription>
      </Alert>
    </div>
  );
}

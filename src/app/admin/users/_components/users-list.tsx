// src/app/admin/users/_components/users-list.tsx
'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { listUsers } from '../actions';
import type { UserRecord } from 'firebase-admin/auth';
import { format } from 'date-fns';

export default function UsersList() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = await listUsers();
        setUsers(userList);
      } catch (e: any) {
        setError("Failed to fetch users. Ensure you have the correct permissions.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (error) {
    return <p className="text-center text-destructive">{error}</p>;
  }
  
  if (users.length === 0) {
    return <p className="text-center text-muted-foreground">No users found.</p>
  }

  return (
    <div className="overflow-x-auto">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead className="text-right">Date Created</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.map((user) => (
            <TableRow key={user.uid}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.uid}</TableCell>
                <TableCell className="text-right">
                {format(new Date(user.metadata.creationTime), 'PPP')}
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}

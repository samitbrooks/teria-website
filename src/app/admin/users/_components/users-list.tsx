// src/app/admin/users/_components/users-list.tsx
'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { listUsers } from '../actions';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface AdminUserView {
  uid: string;
  email: string;
  displayName?: string;
  role?: string;
  metadata?: {
    creationTime: string;
  };
}

export default function UsersList() {
  const [users, setUsers] = useState<AdminUserView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = await listUsers();
        setUsers(userList);
      } catch (e: any) {
        setError('Failed to fetch users.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-destructive">{error}</p>;
  }

  if (users.length === 0) {
    return <p className="text-center text-muted-foreground">No users found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name / Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead className="text-right">Date Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.uid}>
              <TableCell className="font-medium">
                <div>
                  <p>{user.displayName || user.email}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{user.role || 'admin'}</Badge>
              </TableCell>
              <TableCell className="text-xs font-mono text-muted-foreground">{user.uid}</TableCell>
              <TableCell className="text-right">
                {user.metadata?.creationTime ? format(new Date(user.metadata.creationTime), 'PPP') : 'Active'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

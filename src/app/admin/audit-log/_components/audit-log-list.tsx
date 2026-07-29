// src/app/admin/audit-log/_components/audit-log-list.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { AuditLogEntry } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

function getInitials(email: string) {
    if (!email) return 'A';
    const parts = email.split('@');
    return parts[0].charAt(0).toUpperCase();
}

export default function AuditLogList() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logsCollection = collection(db, 'auditLog');
    const q = query(logsCollection, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AuditLogEntry));
      setLogs(logsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (logs.length === 0) {
    return <p className="text-center text-muted-foreground">No audit log entries found.</p>;
  }

  return (
    <div className="overflow-x-auto">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {logs.map((log) => (
            <TableRow key={log.id}>
                <TableCell>
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{getInitials(log.user)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{log.user}</span>
                </div>
                </TableCell>
                <TableCell>
                    <Badge variant={log.action.startsWith('delete') ? 'destructive' : 'secondary'}>{log.action}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{log.details}</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                    {format(log.timestamp.toDate(), 'PPP p')}
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}

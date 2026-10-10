// src/app/admin/audit-log/_components/audit-log-list.tsx
'use client';

import { useState, useEffect } from 'react';
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
    let isMounted = true;
    fetch('/api/audit')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success && Array.isArray(data.logs)) {
          setLogs(data.logs);
        }
      })
      .catch(err => console.error('Error fetching audit logs:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateVal: any) => {
    try {
      if (dateVal?.toDate && typeof dateVal.toDate === 'function') {
        return format(dateVal.toDate(), 'PPP p');
      }
      return format(new Date(dateVal), 'PPP p');
    } catch {
      return 'Recent';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
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
                <Badge variant={log.action.toLowerCase().includes('delete') ? 'destructive' : 'secondary'}>
                  {log.action}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{log.details}</TableCell>
              <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                {formatDate(log.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

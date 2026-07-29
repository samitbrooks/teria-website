// src/app/admin/donations/_components/top-donors.tsx
import type { Donation } from '@/types';
import { useMemo } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface TopDonorsProps {
  donations: Donation[];
}

export default function TopDonors({ donations }: TopDonorsProps) {
  const topDonors = useMemo(() => {
    const successfulDonations = donations.filter(d => d.status === 'success');
    
    const donorTotals: { [email: string]: { name: string; total: number } } = {};

    successfulDonations.forEach(d => {
      if (!donorTotals[d.email]) {
        donorTotals[d.email] = { name: d.name, total: 0 };
      }
      donorTotals[d.email].total += d.amount;
    });

    return Object.entries(donorTotals)
      .map(([email, data]) => ({ email, ...data }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [donations]);

  if (topDonors.length === 0) {
    return <p className="text-center text-sm text-muted-foreground">No successful donations yet.</p>;
  }

  return (
    <div className="space-y-4">
      {topDonors.map(donor => (
        <div key={donor.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{donor.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{donor.name}</p>
            <p className="text-sm text-muted-foreground">{donor.email}</p>
          </div>
          <div className="ml-auto font-medium">
             <Badge variant="secondary">
                {(donor.total / 100).toLocaleString('en-US', { style: 'currency', currency: 'KES' })}
             </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

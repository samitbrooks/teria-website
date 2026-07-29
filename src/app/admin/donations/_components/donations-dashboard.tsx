// src/app/admin/donations/_components/donations-dashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, TrendingUp, BarChart } from 'lucide-react';
import type { Donation } from '@/types';
import { useMemo } from 'react';
import { subDays } from 'date-fns';

interface DonationsDashboardProps {
  donations: Donation[];
}

export default function DonationsDashboard({ donations }: DonationsDashboardProps) {
  const stats = useMemo(() => {
    const successfulDonations = donations.filter(d => d.status === 'success');
    const totalRevenue = successfulDonations.reduce((acc, d) => acc + d.amount, 0);
    const uniqueDonors = new Set(successfulDonations.map(d => d.email)).size;

    const thirtyDaysAgo = subDays(new Date(), 30);
    const monthlyDonations = successfulDonations.filter(d => d.createdAt.toDate() > thirtyDaysAgo);
    const monthlyRevenue = monthlyDonations.reduce((acc, d) => acc + d.amount, 0);

    return {
      totalRevenue: totalRevenue / 100,
      averageDonation: successfulDonations.length > 0 ? (totalRevenue / successfulDonations.length) / 100 : 0,
      monthlyRevenue: monthlyRevenue / 100,
      uniqueDonors,
    };
  }, [donations]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</div>
          <p className="text-xs text-muted-foreground">Lifetime donations</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Donations (Last 30 days)</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</div>
          <p className="text-xs text-muted-foreground">Revenue in the last 30 days</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Donors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.uniqueDonors}</div>
          <p className="text-xs text-muted-foreground">Total number of unique supporters</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageDonation.toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</div>
           <p className="text-xs text-muted-foreground">Average donation amount</p>
        </CardContent>
      </Card>
    </div>
  );
}

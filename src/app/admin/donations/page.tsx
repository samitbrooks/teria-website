// src/app/admin/donations/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { Donation } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DonationsList from './_components/donations-list';
import DonationsDashboard from './_components/donations-dashboard';
import { Loader2 } from 'lucide-react';
import DonationsChart from './_components/donations-chart';
import TopDonors from './_components/top-donors';

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const donationsCollection = collection(db, 'donations');
    const q = query(donationsCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donation));
      setDonations(donationsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <DonationsDashboard donations={donations} />
      
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Donations Over Last 30 Days</CardTitle></CardHeader>
            <CardContent>
                <DonationsChart donations={donations} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Top Donors</CardTitle></CardHeader>
            <CardContent>
                <TopDonors donations={donations} />
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <DonationsList donations={donations} />
        </CardContent>
      </Card>
    </div>
  );
}

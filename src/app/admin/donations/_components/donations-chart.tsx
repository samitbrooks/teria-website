// src/app/admin/donations/_components/donations-chart.tsx
'use client';

import type { Donation } from '@/types';
import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { subDays, format, eachDayOfInterval } from 'date-fns';

interface DonationsChartProps {
  donations: Donation[];
}

export default function DonationsChart({ donations }: DonationsChartProps) {
  const chartData = useMemo(() => {
    const successfulDonations = donations.filter(d => d.status === 'success');
    const endDate = new Date();
    const startDate = subDays(endDate, 29);
    
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const dailyTotals = dateRange.map(date => {
        const formattedDate = format(date, 'MMM d');
        const total = successfulDonations
            .filter(d => format(d.createdAt.toDate(), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
            .reduce((sum, d) => sum + d.amount / 100, 0);
        return { name: formattedDate, total };
    });

    return dailyTotals;
  }, [donations]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `KES ${value}`}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--secondary))' }}
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

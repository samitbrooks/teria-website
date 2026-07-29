import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage Posts</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Blog Content</div>
            <p className="text-xs text-muted-foreground">Create, edit, and delete blog posts.</p>
            <Link href="/admin/posts" className="text-sm font-medium text-primary hover:underline mt-2 inline-block">
              Go to Posts &rarr;
            </Link>
          </CardContent>
        </Card>
        {/* Placeholder for future cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Coming Soon</div>
            <p className="text-xs text-muted-foreground">Website traffic and engagement.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

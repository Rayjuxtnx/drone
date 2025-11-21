'use client';
import { DronesList } from '@/components/admin/drones-list';
import { RecentActivity } from '@/components/admin/recent-activity';
import { StatsCards } from '@/components/admin/stats-cards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map } from 'lucide-react';
import { NavigationalMap } from '@/components/common/navigational-map';

export default function AdminDashboardPage() {
  
  return (
    <div className="space-y-8">
      <StatsCards />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <RecentActivity />
        </div>
        <div>
            <DronesList />
        </div>
      </div>
       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Map /> Fleet Map</CardTitle>
            <CardDescription>A global view of drone locations and mission hotspots.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="aspect-video relative rounded-lg overflow-hidden border">
              <NavigationalMap />
            </div>
        </CardContent>
       </Card>
    </div>
  );
}

'use client';
import { DronesList } from '@/components/admin/drones-list';
import { RecentActivity } from '@/components/admin/recent-activity';
import { StatsCards } from '@/components/admin/stats-cards';

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
    </div>
  );
}

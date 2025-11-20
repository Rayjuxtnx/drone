'use client'
import type { ReactNode } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import {
  LayoutDashboard,
  PlaneTakeoff,
  Map,
  User,
} from 'lucide-react';

const dashboardLinks = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/bookings', label: 'My Bookings', icon: PlaneTakeoff },
  { href: '/dashboard/missions', label: 'My Missions', icon: Map },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

export default function CustomerDashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout navLinks={dashboardLinks}>{children}</DashboardLayout>;
}

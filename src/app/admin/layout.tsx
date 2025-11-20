import type { ReactNode } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import {
  LayoutDashboard,
  Rocket,
  Map,
  PlaneTakeoff,
  Users,
  Bell,
} from 'lucide-react';

const adminLinks = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/drones', label: 'Drones', icon: Rocket },
  { href: '/admin/missions', label: 'Missions', icon: Map },
  { href: '/admin/bookings', label: 'Bookings', icon: PlaneTakeoff },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/alerts', label: 'AI Weather Alerts', icon: Bell },
];

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout navLinks={adminLinks}>{children}</DashboardLayout>;
}

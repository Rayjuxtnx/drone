'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Rocket,
  PanelLeft,
  LayoutDashboard,
  Users,
  LocateFixed,
  Map,
  Bot,
  type LucideIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React from 'react';

const adminNavLinks = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/drones', label: 'Drones', icon: LocateFixed },
    { href: '/admin/missions', label: 'Missions', icon: Map },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/ai-tools', label: 'AI Weather Alerts', icon: Bot },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={cn(
      isMobile 
        ? "grid gap-6 text-lg font-medium" 
        : "flex flex-col gap-2 px-2 text-sm font-medium lg:px-4"
    )}>
       <Link
          href="/"
          className={cn(
            "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base",
            !isMobile && "mb-2"
          )}
        >
          <Rocket className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">DroneTrack</span>
        </Link>
      {adminNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname.startsWith(link.href) && (link.href !== '/admin') && "text-primary bg-muted",
            pathname === link.href && "text-primary bg-muted",
            isMobile && "gap-4 text-base"
          )}
        >
          <link.icon className="h-4 w-4" />
          <span className={cn(isMobile ? "" : "hidden md:inline")}>{link.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-background md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="">DroneTrack Admin</span>
            </Link>
          </div>
          <div className="flex-1 py-4">
             <NavContent />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <NavContent isMobile />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can add search bar here */}
          </div>
          {/* Can add user dropdown here */}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

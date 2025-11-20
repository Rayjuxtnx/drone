'use client';
import Link from 'next/link';
import { Rocket, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/booking', label: 'Book Now' },
  { href: '/track', label: 'Track Mission' }
];

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">DroneTrack</span>
        </Link>
        <nav className="hidden flex-1 gap-6 text-sm font-medium md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                'text-foreground/60'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <Rocket className="h-6 w-6 text-primary" />
                <span className="font-bold">DroneTrack</span>
              </Link>
              <div className="mt-6 flex flex-col space-y-4">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="transition-colors hover:text-foreground/80"
                  >
                    {label}
                  </Link>
                ))}
                 <hr className="my-2" />
                 {isAuthenticated ? (
                    <Button variant="ghost" onClick={logout}>Logout</Button>
                 ) : (
                    <Link href="/login" className="transition-colors hover:text-foreground/80">Login</Link>
                 )}
                 <Link href="/admin" className="transition-colors hover:text-foreground/80">Admin</Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden items-center space-x-2 md:flex">
             {isAuthenticated ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button variant="outline" onClick={logout}>Logout</Button>
                </>
             ) : (
                <Button variant="ghost" asChild>
                  <Link href="/login">Customer Login</Link>
                </Button>
             )}
            <Button variant="outline" asChild>
                <Link href="/admin">Admin / Operator</Link>
            </Button>
            <Button asChild>
                <Link href="/booking">Book a Drone</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Drone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <Drone className="h-6 w-6 text-primary" />
            <p className="text-lg font-bold">DroneTrack</p>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} DroneTrack Inc. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/#services" className="hover:text-foreground">Services</Link>
            <Link href="/booking" className="hover:text-foreground">Booking</Link>
            <Link href="/track" className="hover:text-foreground">Tracking</Link>
        </div>
      </div>
    </footer>
  );
}

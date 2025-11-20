import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/use-auth';

export const metadata: Metadata = {
  title: 'DroneTrack - Smart Drone Services On Demand',
  description: 'A platform to book drone services, manage missions, and track flights in real-time.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body 
        className={cn(
          "min-h-screen font-body antialiased bg-drone-lights-animation"
        )} 
        style={{
          backgroundImage: `linear-gradient(-45deg, hsl(var(--background)), hsl(220, 13%, 15%))`
        }}
        suppressHydrationWarning
      >
        <AuthProvider>
          <div className="relative flex min-h-dvh flex-col bg-transparent">
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

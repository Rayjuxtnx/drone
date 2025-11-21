
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/use-auth';
import { useState, useEffect } from 'react';
import { PreLoader } from '@/components/common/pre-loader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  // This effect will run once on the client
  useEffect(() => {
    // We check session storage to see if we should show the preloader.
    // This prevents it from showing on every page navigation.
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setLoading(false);
    }
  }, []);
  
  const handlePreloaderComplete = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setLoading(false);
  }

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <title>DroneTrack - Smart Drone Services On Demand</title>
        <meta name="description" content="A platform to book drone services, manage missions, and track flights in real-time." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
        <PreLoader loading={loading} onComplete={handlePreloaderComplete} />
        <AuthProvider>
          <div className={cn(
            "relative flex min-h-dvh flex-col bg-transparent transition-opacity duration-1000",
            loading ? 'opacity-0' : 'opacity-100'
            )}>
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

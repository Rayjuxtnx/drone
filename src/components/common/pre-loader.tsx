'use client';

import { Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PreLoader({ loading }: { loading: boolean }) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-500',
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="flex items-center gap-4 mb-4 animate-pulse">
        <Rocket className="h-12 w-12 text-primary" />
        <span className="text-3xl font-bold tracking-wider">DroneTrack</span>
      </div>
      <p className="text-muted-foreground">Initializing Systems...</p>
    </div>
  );
}

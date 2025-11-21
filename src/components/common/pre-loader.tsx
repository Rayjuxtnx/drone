'use client';

import { Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


export function PreLoader({ loading, onComplete }: { loading: boolean, onComplete: () => void }) {
  const [showButtons, setShowButtons] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 2500); // Animation duration before buttons appear

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleAdminLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const passkey = prompt("Enter the admin passkey:");
    if (passkey === '123456') {
      router.push('/admin');
      onComplete();
    } else if (passkey !== null) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "The passkey you entered is incorrect.",
      });
    }
  };

  const handleCustomerLogin = () => {
    router.push('/login');
    onComplete();
  };

  const handleContinue = () => {
    onComplete();
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex flex-col items-center justify-center bg-preloader-gradient transition-opacity duration-1000',
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className={cn(
          "absolute inset-0 bg-grid-pattern transition-opacity duration-1000",
          showButtons ? 'opacity-0' : 'opacity-100'
      )} />

      <div className={cn(
        "flex flex-col items-center justify-center transition-all duration-1000",
        showButtons ? 'scale-50 -translate-y-32' : 'scale-100'
      )}>
        <div className="relative mb-4">
          <Rocket className={cn(
            "h-16 w-16 text-primary drop-shadow-[0_0_15px_hsl(var(--primary))]",
            !showButtons && 'animate-fly-in'
          )} />
           <div className={cn(
               "absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 bg-spotlight-gradient rounded-full blur-3xl transition-opacity duration-1000",
               showButtons ? "opacity-0" : "opacity-70 animate-pulse-slow"
           )} />
        </div>
        <p className={cn(
            "text-2xl font-bold tracking-wider text-white transition-opacity duration-1000",
            showButtons ? 'opacity-0' : 'opacity-100'
            )}>
            DroneTrack Systems
        </p>
        <p className={cn(
            "text-muted-foreground transition-opacity duration-1000",
            showButtons ? 'opacity-0' : 'opacity-100'
            )}>Initializing...</p>
      </div>

       <div className={cn(
           "absolute top-1/2 mt-8 flex flex-col items-center gap-4 transition-opacity duration-1000",
           showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome</h1>
          <div className="flex gap-4">
            <Button size="lg" onClick={handleCustomerLogin}>Customer Login</Button>
            <Button size="lg" variant="secondary" onClick={handleAdminLogin}>Admin Login</Button>
          </div>
          <Button variant="link" onClick={handleContinue} className="mt-4 text-sm text-primary-foreground/60">
            Continue to site &rarr;
          </Button>
       </div>
    </div>
  );
}

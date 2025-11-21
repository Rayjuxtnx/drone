'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, LocateFixed, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function TrackLocateSection() {
  const router = useRouter();
  const [missionId, setMissionId] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const { toast } = useToast();

  const handleTrackMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (missionId.trim()) {
      router.push(`/track?missionId=${missionId.trim()}`);
    }
  };

  const handleDetectLocation = () => {
    setIsDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          toast({
            title: "Location Detected!",
            description: `Your current coordinates are: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
          setIsDetecting(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsDetecting(false);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not detect your location. Please enable permissions and try again.",
          });
        }
      );
    } else {
      setIsDetecting(false);
      toast({
        variant: "destructive",
        title: "Unsupported",
        description: "Geolocation is not supported by your browser.",
      });
    }
  };


  return (
    <section id="track" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container flex justify-center">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Track & Locate</CardTitle>
            <CardDescription>Enter a Mission ID to track a flight, or find your own location instantly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleTrackMission} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter Mission ID (e.g., mission-abc-123)"
                value={missionId}
                onChange={(e) => setMissionId(e.target.value)}
                className="flex-grow text-base"
              />
              <Button type="submit" size="lg" className='flex-shrink-0'>
                Track Mission <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    Or
                    </span>
                </div>
            </div>
             <Button 
                onClick={handleDetectLocation} 
                variant="secondary" 
                className="w-full"
                disabled={isDetecting}
            >
                {isDetecting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <LocateFixed className="mr-2 h-4 w-4" />
                )}
                Detect My Location
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

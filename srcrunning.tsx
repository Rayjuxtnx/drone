'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function TrackMissionSection() {
  const router = useRouter();
  const [missionId, setMissionId] = useState('');

  const handleTrackMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (missionId.trim()) {
      router.push(`/track?missionId=${missionId.trim()}`);
    }
  };

  return (
    <section id="track" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container flex justify-center">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Track Your Mission</CardTitle>
            <CardDescription>Enter your Mission ID to see live updates and drone location.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackMission} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter Mission ID (e.g., mission-abc-123)"
                value={missionId}
                onChange={(e) => setMissionId(e.target.value)}
                className="flex-grow text-base"
              />
              <Button type="submit" size="lg">
                Track Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

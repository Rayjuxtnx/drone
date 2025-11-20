'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { INITIAL_MISSIONS } from '@/lib/data';
import { Mission, MissionStatus } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, BatteryFull, Gauge, MapPinned, Clock } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { RiskAnalysis } from '@/components/tracking/risk-analysis';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const statusColors: { [key in MissionStatus]: string } = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Accepted: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

function TrackingPageContent() {
  const searchParams = useSearchParams();
  const missionId = searchParams.get('missionId');
  const [missions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);
  const trackingMapImage = PlaceHolderImages.find(img => img.id === 'tracking-map');

  const mission = missions.find(m => m.id === missionId);

  if (!mission) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Mission not found. Please check the Mission ID and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">Tracking Mission: {mission.id}</CardTitle>
              <CardDescription>Service: {mission.serviceType}</CardDescription>
            </div>
            <Badge className={cn("text-lg capitalize", statusColors[mission.status])}>{mission.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {mission.telemetry && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <Gauge className="mx-auto h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Speed</p>
                <p className="text-2xl font-bold">{mission.telemetry.speed} mph</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <MapPinned className="mx-auto h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Altitude</p>
                <p className="text-2xl font-bold">{mission.telemetry.altitude} ft</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <BatteryFull className="mx-auto h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Battery</p>
                <p className="text-2xl font-bold">{mission.telemetry.battery}%</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Clock className="mx-auto h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">ETA</p>
                <p className="text-2xl font-bold">{mission.eta || 'N/A'}</p>
              </div>
            </div>
          )}

          {trackingMapImage && (
            <div className="aspect-video relative rounded-lg overflow-hidden border">
              <Image
                src={trackingMapImage.imageUrl}
                alt={trackingMapImage.description}
                fill
                className="object-cover"
                data-ai-hint={trackingMapImage.imageHint}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <RiskAnalysis mission={mission} />
    </div>
  );
}

export default function TrackingPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="container py-12">Loading mission data...</div>}>
        <TrackingPageContent />
      </Suspense>
      <Footer />
    </>
  );
}

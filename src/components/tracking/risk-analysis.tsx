'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { optimizeRoutesAndLandingSpots, OptimizeRoutesAndLandingSpotsOutput } from '@/ai/flows/optimize-routes-and-landing-spots';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Zap, ShieldCheck, MapPin, AlertTriangle } from 'lucide-react';
import type { Mission } from '@/lib/types';
import { Separator } from '../ui/separator';

interface RiskAnalysisProps {
  mission: Mission;
}

const initialState: OptimizeRoutesAndLandingSpotsOutput | { error: string } | null = null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
      Analyze Risks & Optimize
    </Button>
  );
}

export function RiskAnalysis({ mission }: RiskAnalysisProps) {
  const [weatherData, setWeatherData] = useState('Current conditions: 15 mph winds from SSW, light rain, visibility 3 miles.');
  
  const [state, formAction] = useActionState(async (prevState: typeof initialState, formData: FormData) => {
    try {
      const result = await optimizeRoutesAndLandingSpots({
        missionDetails: formData.get('missionDetails') as string,
        weatherData: formData.get('weatherData') as string,
      });
      return result;
    } catch (e: any) {
      return { error: e.message || "An unknown error occurred." };
    }
  }, initialState);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="text-primary"/>
          AI-Powered Flight Optimization
        </CardTitle>
        <CardDescription>
          Analyze real-time weather data to identify risks and find safer alternatives for your mission.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="missionDetails" value={`Mission ID: ${mission.id}, Current Route: from ${mission.pickupLocation} to ${mission.destinationLocation}`} />
          
          <div className="space-y-2">
            <Label htmlFor="weatherData">Simulated Real-Time Weather Data</Label>
            <Textarea
              id="weatherData"
              name="weatherData"
              value={weatherData}
              onChange={(e) => setWeatherData(e.target.value)}
              placeholder="e.g., 20 mph winds, heavy rain..."
              rows={3}
            />
             <p className="text-sm text-muted-foreground">Modify the weather conditions to see how the AI adjusts its recommendations.</p>
          </div>
          
          <SubmitButton />
        </form>

        {state && (
          <div className="mt-6 space-y-4">
            <Separator />
            <h3 className="font-semibold text-lg">Optimization Results</h3>
            {'error' in state ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <AlertTitle className="text-orange-600">Risk Analysis</AlertTitle>
                  <AlertDescription>{state.riskAnalysis}</AlertDescription>
                </Alert>
                <Alert variant="default" className="bg-green-50 border-green-200">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-700">Suggested Safe Route</AlertTitle>
                  <AlertDescription>{state.safeRoute}</AlertDescription>
                </Alert>
                 <Alert variant="default" className="bg-blue-50 border-blue-200">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-700">Suggested Landing Spot</AlertTitle>
                  <AlertDescription>{state.safeLandingSpot}</AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

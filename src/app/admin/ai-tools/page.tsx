'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  optimizeRoutesAndLandingSpots,
  OptimizeRoutesAndLandingSpotsOutput,
} from '@/ai/flows/optimize-routes-and-landing-spots';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Zap, ShieldCheck, MapPin, AlertTriangle, Wand2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const initialState: OptimizeRoutesAndLandingSpotsOutput | { error: string } | null = null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Analyze & Optimize
    </Button>
  );
}

export default function AiToolsPage() {
  const [missionDetails, setMissionDetails] = useState('Mission ID: mission-xyz-789, Current Route: from Downtown LA to Santa Monica Pier');
  const [weatherData, setWeatherData] = useState('Current conditions: 25 mph winds from W, moderate rain, visibility 1 mile.');

  const [state, formAction] = useActionState(async (prevState: typeof initialState, formData: FormData) => {
    try {
      const result = await optimizeRoutesAndLandingSpots({
        missionDetails: formData.get('missionDetails') as string,
        weatherData: formData.get('weatherData') as string,
      });
      return result;
    } catch (e: any) {
      return { error: e.message || 'An unknown error occurred.' };
    }
  }, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="text-primary" />
          AI Flight Risk Analysis
        </CardTitle>
        <CardDescription>
          Use AI to analyze real-time weather data against mission parameters to identify risks and find safer, optimized routes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="missionDetails">Mission Details</Label>
            <Textarea
              id="missionDetails"
              name="missionDetails"
              value={missionDetails}
              onChange={(e) => setMissionDetails(e.target.value)}
              placeholder="Enter mission details..."
              rows={2}
            />
          </div>

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
            <p className="text-sm text-muted-foreground">
              Modify the weather conditions to see how the AI adjusts its recommendations.
            </p>
          </div>

          <SubmitButton />
        </form>

        {state && (
          <div className="mt-8 space-y-4">
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
                  <AlertTitle className="font-semibold text-orange-500">Risk Analysis</AlertTitle>
                  <AlertDescription>{state.riskAnalysis}</AlertDescription>
                </Alert>
                <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700">
                  <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="font-semibold text-green-700 dark:text-green-300">Suggested Safe Route</AlertTitle>
                  <AlertDescription>{state.safeRoute}</AlertDescription>
                </Alert>
                <Alert variant="default" className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="font-semibold text-blue-700 dark:text-blue-300">Suggested Landing Spot</AlertTitle>
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

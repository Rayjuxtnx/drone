'use client';
import { RiskAnalysis } from "@/components/tracking/risk-analysis";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_MISSIONS } from "@/lib/data";
import type { Mission } from "@/lib/types";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

export default function AlertsPage() {
  const [missions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);

  useEffect(() => {
    if (missions.length > 0 && !selectedMissionId) {
      setSelectedMissionId(missions[0].id);
    }
  }, [missions, selectedMissionId]);

  const selectedMission = missions.find(m => m.id === selectedMissionId);

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select a Mission</CardTitle>
              <CardDescription>Choose a mission to run a risk analysis on.</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedMissionId} value={selectedMissionId || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a mission" />
                </SelectTrigger>
                <SelectContent>
                  {missions.map(mission => (
                    <SelectItem key={mission.id} value={mission.id}>
                      {mission.id} ({mission.serviceType})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
      </div>

      <div className="md:col-span-2">
        {selectedMission ? (
          <RiskAnalysis mission={selectedMission} />
        ) : (
          <Card className="flex flex-col items-center justify-center text-center h-full p-8">
            <AlertCircle className="w-16 h-16 text-muted-foreground mb-4"/>
            <CardTitle>No Mission Selected</CardTitle>
            <CardDescription>Please select a mission from the dropdown to analyze its risks.</CardDescription>
          </Card>
        )}
      </div>
    </div>
  );
}

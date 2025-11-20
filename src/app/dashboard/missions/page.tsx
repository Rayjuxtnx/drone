'use client';

import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_MISSIONS } from "@/lib/data";
import { Mission, MissionStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Map } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: { [key in MissionStatus]: string } = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Accepted: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

export default function MyMissionsPage() {
  const [missions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);
  // MVP: assuming a single customer
  const customerMissions = missions.filter(m => m.customerId === 'customer-1');

  const activeMissions = customerMissions.filter(m => m.status === 'In Progress');
  const completedMissions = customerMissions.filter(m => m.status === 'Completed');

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Active Missions</CardTitle>
          <CardDescription>These are your missions that are currently in flight.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mission ID</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeMissions.length > 0 ? activeMissions.map((mission) => (
                <TableRow key={mission.id}>
                  <TableCell>{mission.id}</TableCell>
                  <TableCell>{mission.serviceType}</TableCell>
                  <TableCell>{mission.eta || 'N/A'}</TableCell>
                  <TableCell>
                    <Button asChild variant="default" size="sm">
                      <Link href={`/track?missionId=${mission.id}`}><Map className="mr-2 h-4 w-4" /> Live Track</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                 <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">No active missions.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Completed Missions</CardTitle>
          <CardDescription>A log of your successfully completed flights.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mission ID</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedMissions.length > 0 ? completedMissions.map((mission) => (
                <TableRow key={mission.id}>
                  <TableCell>{mission.id}</TableCell>
                  <TableCell>{mission.serviceType}</TableCell>
                  <TableCell>{new Date(mission.dateTime).toLocaleDateString()}</TableCell>
                </TableRow>
              )) : (
                 <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">No completed missions yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_MISSIONS } from "@/lib/data";
import { Mission, MissionStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusColors: { [key in MissionStatus]: string } = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Accepted: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

export default function MissionControlPage() {
  const [missions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mission Control</CardTitle>
        <CardDescription>Oversee all active, pending, and completed missions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mission ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Drone</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {missions.map((mission) => (
              <TableRow key={mission.id}>
                <TableCell className="font-medium">{mission.id}</TableCell>
                <TableCell>
                  <Badge className={cn("capitalize", statusColors[mission.status])}>
                    {mission.status}
                  </Badge>
                </TableCell>
                <TableCell>{mission.serviceType}</TableCell>
                <TableCell>{mission.droneId || 'N/A'}</TableCell>
                <TableCell>{mission.operatorId || 'N/A'}</TableCell>
                <TableCell>{new Date(mission.dateTime).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-[150px] truncate">{mission.pickupLocation}</TableCell>
                <TableCell className="max-w-[150px] truncate">{mission.destinationLocation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

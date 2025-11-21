
'use client';

import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_MISSIONS } from "@/lib/data";
import { Mission, MissionStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Map, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: { [key in MissionStatus]: string } = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Accepted: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

export default function MyBookingsPage() {
  const [missions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);
  // MVP: assuming a single customer
  const customerMissions = missions.filter(m => m.customerId === 'customer-1');

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
        <CardDescription>A complete history of all your drone service bookings.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mission ID</TableHead>
              <TableHead className="hidden sm:table-cell">Service</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Drone Model</TableHead>
              <TableHead className="hidden lg:table-cell">Price (Ksh)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerMissions.length > 0 ? customerMissions.map((mission) => (
              <TableRow key={mission.id}>
                <TableCell className="font-medium">{mission.id}</TableCell>
                <TableCell className="hidden sm:table-cell">{mission.serviceType}</TableCell>
                <TableCell className="hidden md:table-cell">{new Date(mission.dateTime).toLocaleString()}</TableCell>
                <TableCell className="hidden md:table-cell">{mission.droneModel || 'Any'}</TableCell>
                <TableCell className="hidden lg:table-cell">{mission.estimatedPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={cn("capitalize", statusColors[mission.status])}>
                    {mission.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm" disabled={mission.status !== 'In Progress'}>
                    <Link href={`/track?missionId=${mission.id}`}>
                      <Map className="mr-2 h-4 w-4" /> Track
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  You haven't booked any missions yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

    
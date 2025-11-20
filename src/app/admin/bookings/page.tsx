'use client';

import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_MISSIONS } from "@/lib/data";
import { Mission, MissionStatus, missionStatuses } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: { [key in MissionStatus]: string } = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Accepted: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

export default function BookingManagementPage() {
  const [missions, setMissions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);

  const handleStatusChange = (missionId: string, newStatus: MissionStatus) => {
    setMissions(currentMissions =>
      currentMissions.map(m =>
        m.id === missionId ? { ...m, status: newStatus } : m
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Management</CardTitle>
        <CardDescription>Review customer booking requests, set pricing, and approve or reject missions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mission ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {missions.map((mission) => (
              <TableRow key={mission.id}>
                <TableCell className="font-medium">{mission.id}</TableCell>
                <TableCell>{mission.serviceType}</TableCell>
                <TableCell>{mission.customerId}</TableCell>
                <TableCell>{new Date(mission.dateTime).toLocaleString()}</TableCell>
                <TableCell>${mission.estimatedPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={cn("capitalize", statusColors[mission.status])}>
                    {mission.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {missionStatuses.map(status => (
                        <DropdownMenuItem key={status} onSelect={() => handleStatusChange(mission.id, status)}>
                          Set to {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

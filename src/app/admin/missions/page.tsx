
'use client';

import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_MISSIONS, INITIAL_DRONES } from "@/lib/data";
import { Mission, MissionStatus, missionStatuses, Drone } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Truck, User, Bot, Check, X, Rocket } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuPortal } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const statusColors: { [key in MissionStatus]: string } = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Accepted: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};


export default function MissionManagementPage() {
  const [missions, setMissions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);
  const [drones, setDrones] = useLocalStorage<Drone[]>('drones', INITIAL_DRONES);
  const { toast } = useToast();

  const handleStatusChange = (missionId: string, newStatus: MissionStatus) => {
    setMissions(prevMissions => 
      prevMissions.map(m => m.id === missionId ? { ...m, status: newStatus } : m)
    );
  };
  
  const handleApprove = (missionId: string) => {
    const availableDrone = drones.find(d => d.status === 'Available');
    if (!availableDrone) {
      toast({
        variant: 'destructive',
        title: 'Approval Failed',
        description: 'No drones are currently available to assign to this mission.',
      });
      return;
    }

    setMissions(prevMissions =>
      prevMissions.map(m => {
        if (m.id === missionId) {
          toast({
            title: 'Mission Approved!',
            description: `${m.id} has been set to 'In Progress' and assigned to drone ${availableDrone.id}.`,
          });
          return { 
            ...m, 
            status: 'In Progress', 
            droneId: availableDrone.id,
            operatorId: 'operator-1', // Mock operator
            eta: '25 minutes', // Mock ETA
            telemetry: {
              speed: 0,
              altitude: 0,
              battery: availableDrone.battery,
              location: {
                lat: availableDrone.location.lat,
                lng: availableDrone.location.lng
              }
            }
          };
        }
        return m;
      })
    );

    setDrones(prevDrones =>
      prevDrones.map(d => d.id === availableDrone.id ? { ...d, status: 'In Mission' } : d)
    );
  };

  const handleReject = (missionId: string) => {
     handleStatusChange(missionId, 'Rejected');
     toast({
        variant: 'destructive',
        title: 'Mission Rejected',
        description: `Mission ${missionId} has been rejected.`,
      });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mission Control</CardTitle>
        <CardDescription>Oversee and manage all active and pending missions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mission ID</TableHead>
              <TableHead className="hidden sm:table-cell">Customer</TableHead>
              <TableHead className="hidden md:table-cell">Service</TableHead>
              <TableHead className="hidden lg:table-cell">Drone Model</TableHead>
              <TableHead>Assigned Drone</TableHead>
              <TableHead className="hidden lg:table-cell">Price (Ksh)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {missions.map((mission) => (
              <TableRow key={mission.id}>
                <TableCell className="font-medium">{mission.id}</TableCell>
                <TableCell className="hidden sm:table-cell">{mission.customerId}</TableCell>
                <TableCell className="hidden md:table-cell">{mission.serviceType}</TableCell>
                <TableCell className="hidden lg:table-cell">{mission.droneModel || 'Any'}</TableCell>
                <TableCell>{mission.droneId || 'Unassigned'}</TableCell>
                <TableCell className="hidden lg:table-cell">{mission.estimatedPrice.toFixed(2)}</TableCell>
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
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem><Truck className="mr-2 h-4 w-4"/>Assign Drone</DropdownMenuItem>
                      <DropdownMenuItem><User className="mr-2 h-4 w-4"/>Assign Operator</DropdownMenuItem>
                      <DropdownMenuItem><Bot className="mr-2 h-4 w-4"/>Trigger AI Analysis</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {missionStatuses.map(status => (
                                     <DropdownMenuItem 
                                        key={status} 
                                        onClick={() => handleStatusChange(mission.id, status)}
                                        disabled={mission.status === status}
                                    >
                                        {status}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-green-600 focus:bg-green-50 focus:text-green-700"
                        onClick={() => handleApprove(mission.id)}
                        disabled={mission.status !== 'Pending'}
                      >
                        <Check className="mr-2 h-4 w-4"/>Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600 focus:bg-red-50 focus:text-red-700"
                        onClick={() => handleReject(mission.id)}
                        disabled={mission.status === 'Rejected' || mission.status === 'Completed'}
                      >
                        <X className="mr-2 h-4 w-4"/>Reject
                      </DropdownMenuItem>
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

    
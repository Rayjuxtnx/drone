'use client';

import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_DRONES } from "@/lib/data";
import { Drone, DroneStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusColors: { [key in DroneStatus]: string } = {
  Available: "bg-green-100 text-green-800 border-green-200",
  "In Mission": "bg-blue-100 text-blue-800 border-blue-200",
  Maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Offline: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function DroneManagementPage() {
  const [drones, setDrones] = useLocalStorage<Drone[]>('drones', INITIAL_DRONES);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drone Fleet Management</CardTitle>
        <CardDescription>Monitor and manage all drones in your fleet.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Drone ID</TableHead>
              <TableHead className="hidden md:table-cell">Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Battery</TableHead>
              <TableHead className="hidden lg:table-cell">Location</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drones.map((drone) => (
              <TableRow key={drone.id}>
                <TableCell className="font-medium">{drone.id}</TableCell>
                <TableCell className="hidden md:table-cell">{drone.model}</TableCell>
                <TableCell>
                  <Badge className={cn("capitalize", statusColors[drone.status])}>
                    {drone.status}
                  </Badge>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <span>{drone.battery}%</span>
                        <Progress value={drone.battery} className="w-24 h-2 hidden sm:block" />
                    </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{`${drone.location.lat.toFixed(4)}, ${drone.location.lng.toFixed(4)}`}</TableCell>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Assign Mission</DropdownMenuItem>
                       <DropdownMenuItem>Set to Maintenance</DropdownMenuItem>
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

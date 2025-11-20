'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_DRONES, INITIAL_MISSIONS, INITIAL_USERS } from "@/lib/data";
import { Drone as DroneType, Mission, User } from "@/lib/types";
import { Activity, DollarSign, Users, Rocket, List, CheckCircle, Battery } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [drones] = useLocalStorage<DroneType[]>('drones', INITIAL_DRONES);
  const [missions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);
  const [users] = useLocalStorage<User[]>('users', INITIAL_USERS);
  
  const activeMissionsCount = missions.filter(m => m.status === 'In Progress').length;
  const totalBookings = missions.length;
  const totalRevenue = missions.reduce((acc, mission) => acc + (mission.status === 'Completed' ? mission.estimatedPrice : 0), 0);
  const recentMissions = [...missions].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()).slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drones</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drones.length}</div>
            <p className="text-xs text-muted-foreground">{drones.filter(d => d.status === 'Available').length} available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMissionsCount}</div>
            <p className="text-xs text-muted-foreground">{totalBookings} total bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Customers, Operators, Admins</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From completed missions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><List className="h-5 w-5"/> Recent Mission Activity</CardTitle>
            <CardDescription>The last 5 mission updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mission ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMissions.map(mission => (
                  <TableRow key={mission.id}>
                    <TableCell className="font-medium">{mission.id}</TableCell>
                    <TableCell>{mission.serviceType}</TableCell>
                    <TableCell>
                      <Badge className="capitalize">{mission.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5"/> Drone Fleet Status</CardTitle>
            <CardDescription>Live overview of all drones in the fleet.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {drones.map(drone => (
                <div key={drone.id} className="flex items-center">
                  <div className="flex-1">
                    <p className="font-medium">{drone.model} <span className="text-sm text-muted-foreground">({drone.id})</span></p>
                    <p className={cn("text-sm", 
                      drone.status === 'Available' ? 'text-green-500' :
                      drone.status === 'In Mission' ? 'text-blue-500' :
                      drone.status === 'Maintenance' ? 'text-yellow-500' : 'text-gray-500'
                    )}>{drone.status}</p>
                  </div>
                  <div className="flex items-center w-1/3 gap-2">
                    <Battery className={cn("h-5 w-5", drone.battery > 20 ? "text-primary" : "text-destructive")} />
                    <Progress value={drone.battery} className="w-full h-2" />
                    <span className="text-sm font-semibold w-12 text-right">{drone.battery}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_DRONES, INITIAL_MISSIONS, INITIAL_USERS } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Drone as DroneType, Mission, User } from "@/lib/types";
import { Activity, DollarSign, Users, Rocket } from "lucide-react";
import Image from "next/image";

export default function AdminDashboard() {
  const [drones] = useLocalStorage<DroneType[]>('drones', INITIAL_DRONES);
  const [missions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);
  const [users] = useLocalStorage<User[]>('users', INITIAL_USERS);
  
  const adminMapImage = PlaceHolderImages.find(img => img.id === 'admin-map');
  const activeMissions = missions.filter(m => m.status === 'In Progress').length;
  const totalBookings = missions.length;
  const totalRevenue = missions.reduce((acc, mission) => acc + (mission.status === 'Completed' ? mission.estimatedPrice : 0), 0);

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
            <div className="text-2xl font-bold">{activeMissions}</div>
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

      <Card>
        <CardHeader>
          <CardTitle>All Active Drones</CardTitle>
          <CardDescription>A real-time overview of your entire fleet's location and status.</CardDescription>
        </CardHeader>
        <CardContent>
          {adminMapImage && (
            <div className="aspect-video relative rounded-lg overflow-hidden border">
              <Image
                src={adminMapImage.imageUrl}
                alt={adminMapImage.description}
                fill
                className="object-cover"
                data-ai-hint={adminMapImage.imageHint}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

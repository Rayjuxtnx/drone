'use client';

import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_MISSIONS } from "@/lib/data";
import { Mission, MissionStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Hourglass, Activity, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const statusColors: { [key in MissionStatus]: string } = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Accepted: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

export default function CustomerDashboardPage() {
  const [missions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);
  const adminMapImage = PlaceHolderImages.find(img => img.id === 'admin-map');
  // MVP: assuming a single customer
  const customerMissions = missions.filter(m => m.customerId === 'customer-1');

  const upcomingMissions = customerMissions.filter(m => m.status === 'Accepted' || m.status === 'Pending').slice(0, 3);
  const activeMissions = customerMissions.filter(m => m.status === 'In Progress');
  
  const completedCount = customerMissions.filter(m => m.status === 'Completed').length;
  const pendingCount = customerMissions.filter(m => m.status === 'Pending' || m.status === 'Accepted').length;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMissions.length}</div>
            <p className="text-xs text-muted-foreground">Currently in flight</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Missions</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
             <p className="text-xs text-muted-foreground">Booked and pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Missions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground">Total flights finished</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Upcoming Missions</CardTitle>
              <CardDescription>Here are your next scheduled flights.</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/dashboard/bookings">View All <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mission ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingMissions.length > 0 ? upcomingMissions.map((mission) => (
                  <TableRow key={mission.id}>
                    <TableCell className="font-medium">{mission.id}</TableCell>
                    <TableCell>{mission.serviceType}</TableCell>
                    <TableCell>{new Date(mission.dateTime).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={cn("capitalize", statusColors[mission.status])}>{mission.status}</Badge>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No upcoming missions. <Link href="/booking" className="text-primary underline">Book one now!</Link>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapIcon /> World Map</CardTitle>
                <CardDescription>A view of your mission regions.</CardDescription>
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
    </div>
  );
}

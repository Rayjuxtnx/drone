'use client';
import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_MISSIONS, INITIAL_DRONES, INITIAL_USERS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocateFixed, Map, Users, AlertTriangle } from "lucide-react";

export function StatsCards() {
    const [missions] = useLocalStorage('missions', INITIAL_MISSIONS);
    const [drones] = useLocalStorage('drones', INITIAL_DRONES);
    const [users] = useLocalStorage('users', INITIAL_USERS);

    const activeMissions = missions.filter(m => m.status === 'In Progress').length;
    const availableDrones = drones.filter(d => d.status === 'Available').length;
    const maintenanceDrones = drones.filter(d => d.status === 'Maintenance').length;
    const totalUsers = users.length;

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
                    <Map className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{activeMissions}</div>
                    <p className="text-xs text-muted-foreground">Currently in flight</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Drones</CardTitle>
                    <LocateFixed className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{availableDrones}</div>
                    <p className="text-xs text-muted-foreground">Ready for deployment</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                    <p className="text-xs text-muted-foreground">Customers, operators, and admins</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Maintenance Required</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{maintenanceDrones}</div>
                    <p className="text-xs text-muted-foreground">Drones needing service</p>
                </CardContent>
            </Card>
        </div>
    )
}

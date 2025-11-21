'use client';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { INITIAL_DRONES } from '@/lib/data';
import type { Drone, DroneStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BatteryFull, BatteryLow, Wrench, Plane, WifiOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const statusConfig: { [key in DroneStatus]: { icon: React.ElementType, color: string } } = {
  Available: { icon: Plane, color: 'text-green-500' },
  'In Mission': { icon: Plane, color: 'text-blue-500' },
  Maintenance: { icon: Wrench, color: 'text-yellow-500' },
  Offline: { icon: WifiOff, color: 'text-gray-500' },
};

export function DronesList() {
    const [drones] = useLocalStorage<Drone[]>('drones', INITIAL_DRONES);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Drone Status</CardTitle>
                <CardDescription>Live status of all drones in the fleet.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {drones.map(drone => {
                        const Icon = statusConfig[drone.status].icon;
                        return (
                            <div key={drone.id} className="flex items-center">
                                 <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="p-2 bg-muted rounded-full mr-4">
                                                <Icon className={cn("h-5 w-5", statusConfig[drone.status].color)} />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{drone.status}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <div className="flex-grow">
                                    <p className="font-medium">{drone.id}</p>
                                    <p className="text-sm text-muted-foreground">{drone.model}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{drone.battery}%</span>
                                    {drone.battery > 20 ? <BatteryFull className="h-5 w-5 text-green-500" /> : <BatteryLow className="h-5 w-5 text-red-500" />}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

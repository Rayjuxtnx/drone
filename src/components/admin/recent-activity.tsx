'use client';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { INITIAL_MISSIONS } from '@/lib/data';
import type { Mission, MissionStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const statusColors: { [key in MissionStatus]: string } = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Accepted: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

export function RecentActivity() {
    const [missions] = useLocalStorage<Mission[]>('missions', INITIAL_MISSIONS);

    // Sort missions by date to get the most recent ones, assuming dateTime is a valid date string
    const sortedMissions = [...missions].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()).slice(0, 5);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>An overview of the latest mission updates and statuses.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mission ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Update</TableHead>
                            <TableHead>Customer</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedMissions.map(mission => (
                            <TableRow key={mission.id}>
                                <TableCell className="font-medium">{mission.id}</TableCell>
                                <TableCell>
                                    <Badge className={cn("capitalize", statusColors[mission.status])}>{mission.status}</Badge>
                                </TableCell>
                                <TableCell>{formatDistanceToNow(new Date(mission.dateTime), { addSuffix: true })}</TableCell>
                                <TableCell>{mission.customerId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

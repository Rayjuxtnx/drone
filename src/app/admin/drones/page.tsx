'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { INITIAL_DRONES } from '@/lib/data';
import { Drone, DroneStatus, droneStatuses } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const statusColors: { [key in DroneStatus]: string } = {
  Available: "bg-green-100 text-green-800 border-green-200",
  "In Mission": "bg-blue-100 text-blue-800 border-blue-200",
  Maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Offline: "bg-gray-100 text-gray-800 border-gray-200",
};

function DroneForm({ drone, onSave, onCancel }: { drone?: Drone | null; onSave: (drone: Omit<Drone, 'id' | 'location' | 'maintenanceLogs'> & { id?: string }) => void; onCancel: () => void; }) {
  const [model, setModel] = useState(drone?.model || '');
  const [status, setStatus] = useState<DroneStatus>(drone?.status || 'Available');
  const [battery, setBattery] = useState(drone?.battery || 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: drone?.id, model, status, battery: Number(battery) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="model">Drone Model</Label>
        <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g., DJI Mavic 3 Pro" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={(value: DroneStatus) => setStatus(value)}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {droneStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="battery">Battery (%)</Label>
        <Input id="battery" type="number" value={battery} onChange={(e) => setBattery(Number(e.target.value))} min="0" max="100" required />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Drone</Button>
      </DialogFooter>
    </form>
  );
}

export default function DroneManagementPage() {
  const [drones, setDrones] = useLocalStorage<Drone[]>('drones', INITIAL_DRONES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDrone, setEditingDrone] = useState<Drone | null>(null);

  const handleSaveDrone = (droneData: Omit<Drone, 'id' | 'location' | 'maintenanceLogs'> & { id?: string }) => {
    if (droneData.id) {
      setDrones(drones.map(d => d.id === droneData.id ? { ...d, ...droneData } : d));
    } else {
      const newDrone: Drone = {
        ...droneData,
        id: `drone-${Math.random().toString(36).substr(2, 9)}`,
        location: { lat: 34.0522, lng: -118.2437 },
        maintenanceLogs: [],
      };
      setDrones([...drones, newDrone]);
    }
    setIsDialogOpen(false);
    setEditingDrone(null);
  };

  const handleAddNew = () => {
    setEditingDrone(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (drone: Drone) => {
    setEditingDrone(drone);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (droneId: string) => {
    setDrones(drones.filter(d => d.id !== droneId));
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Drone Management</CardTitle>
          <CardDescription>Add, edit, and view details of all drones in your fleet.</CardDescription>
        </div>
        <Button onClick={handleAddNew} size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Drone</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Drone ID</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Battery</TableHead>
              <TableHead>Location</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drones.map((drone) => (
              <TableRow key={drone.id}>
                <TableCell className="font-medium">{drone.id}</TableCell>
                <TableCell>{drone.model}</TableCell>
                <TableCell>
                  <Badge className={cn("capitalize", statusColors[drone.status])}>{drone.status}</Badge>
                </TableCell>
                <TableCell>{drone.battery}%</TableCell>
                <TableCell>{drone.location.lat.toFixed(4)}, {drone.location.lng.toFixed(4)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(drone)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(drone.id)} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingDrone ? 'Edit Drone' : 'Add New Drone'}</DialogTitle>
            </DialogHeader>
            <DroneForm
              drone={editingDrone}
              onSave={handleSaveDrone}
              onCancel={() => { setIsDialogOpen(false); setEditingDrone(null); }}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

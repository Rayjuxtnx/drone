'use client';

import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_USERS } from "@/lib/data";
import { User, UserRole } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const roleColors: { [key in UserRole]: string } = {
  admin: "bg-red-100 text-red-800 border-red-200",
  operator: "bg-blue-100 text-blue-800 border-blue-200",
  customer: "bg-green-100 text-green-800 border-green-200",
};

export default function UserManagementPage() {
  const [users, setUsers] = useLocalStorage<User[]>('users', INITIAL_USERS);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(currentUsers =>
      currentUsers.map(u => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage user accounts and permissions for customers, operators, and admins.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={cn("capitalize", roleColors[user.role])}>{user.role}</Badge>
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
                      <DropdownMenuItem onSelect={() => handleRoleChange(user.id, 'customer')}>Set as Customer</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleRoleChange(user.id, 'operator')}>Set as Operator</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleRoleChange(user.id, 'admin')}>Set as Admin</DropdownMenuItem>
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

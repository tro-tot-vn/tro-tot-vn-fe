import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Lock, Unlock, UserPlus } from "lucide-react";
import { Link } from "react-router";

// Mock data for moderators
const moderators = [
  {
    id: 1,
    name: "Nguyen Van Moderator",
    email: "moderator1@example.com",
    phone: "0901234567",
    status: "active",
    lastActive: "2025-03-13T08:30:00Z",
    createdAt: "2024-10-15T09:00:00Z",
  },
  {
    id: 2,
    name: "Tran Thi Reviewer",
    email: "moderator2@example.com",
    phone: "0912345678",
    status: "active",
    lastActive: "2025-03-13T09:15:00Z",
    createdAt: "2024-11-20T10:30:00Z",
  },
  {
    id: 3,
    name: "Le Van Admin",
    email: "moderator3@example.com",
    phone: "0923456789",
    status: "inactive",
    lastActive: "2025-03-10T14:45:00Z",
    createdAt: "2025-01-05T08:15:00Z",
  },
  {
    id: 4,
    name: "Pham Thi Moderator",
    email: "moderator4@example.com",
    phone: "0934567890",
    status: "active",
    lastActive: "2025-03-13T07:20:00Z",
    createdAt: "2025-02-10T11:45:00Z",
  },
];

export default function ModeratorsPage() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Moderators</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Moderator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Moderator</DialogTitle>
                <DialogDescription>
                  Create a new moderator account. They will receive an email
                  with login instructions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" type="tel" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Moderator Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {moderators.map((moderator) => (
                  <TableRow
                    key={moderator.id}
                    className="cursor-pointer hover:bg-gray-200 border border-gray-100"
                  >
                    <TableCell className="font-bold whitespace-normal break-words p-4">
                      {moderator.name}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {moderator.email}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {moderator.phone}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      <Badge
                        variant={
                          moderator.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {moderator.status.charAt(0).toUpperCase() +
                          moderator.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {new Date(moderator.lastActive).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {new Date(moderator.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/users/moderators/${moderator.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className={
                            moderator.status === "active"
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          {moderator.status === "active" ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <Unlock className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

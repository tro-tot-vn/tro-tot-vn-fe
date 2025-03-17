import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Link } from "react-router";

// Mock data for user reports
const userReports = [
  {
    id: 1,
    reportedUser: "Tran Van X",
    reportedUserType: "Landlord",
    reportType: "Fake information",
    reportedBy: "Nguyen Thi Y",
    status: "pending",
    createdAt: "2025-03-12T10:30:00Z",
  },
  {
    id: 2,
    reportedUser: "Le Thi Z",
    reportedUserType: "Tenant",
    reportType: "Harassment",
    reportedBy: "Pham Van W",
    status: "pending",
    createdAt: "2025-03-12T11:45:00Z",
  },
  {
    id: 3,
    reportedUser: "Hoang Van M",
    reportedUserType: "Landlord",
    reportType: "Scam attempt",
    reportedBy: "Vo Thi N",
    status: "pending",
    createdAt: "2025-03-12T14:20:00Z",
  },
  {
    id: 4,
    reportedUser: "Nguyen Van P",
    reportedUserType: "Landlord",
    reportType: "False advertising",
    reportedBy: "Tran Thi Q",
    status: "resolved",
    createdAt: "2025-03-11T09:15:00Z",
    resolvedAt: "2025-03-11T15:30:00Z",
  },
  {
    id: 5,
    reportedUser: "Pham Thi R",
    reportedUserType: "Tenant",
    reportType: "Inappropriate behavior",
    reportedBy: "Le Van S",
    status: "rejected",
    createdAt: "2025-03-11T13:40:00Z",
    resolvedAt: "2025-03-11T16:20:00Z",
  },
];

export default function UserReportsPage() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">User Reports</h1>
          <div className="text-sm text-muted-foreground">
            Pending:{" "}
            {userReports.filter((report) => report.status === "pending").length}{" "}
            reports
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reports Against Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reported User</TableHead>
                  <TableHead>User Type</TableHead>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userReports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="cursor-pointer hover:bg-gray-200 border border-gray-100"
                  >
                    <TableCell className="font-semibold whitespace-normal break-words p-4">
                      {report.reportedUser}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {report.reportedUserType}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {report.reportType}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {report.reportedBy}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      <Badge
                        variant={
                          report.status === "pending"
                            ? "outline"
                            : report.status === "resolved"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {report.status.charAt(0).toUpperCase() +
                          report.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {new Date(report.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium whitespace-normal break-words p-4">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/reports/users/${report.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
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

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

// Mock data for listing reports
const listingReports = [
  {
    id: 1,
    listingTitle: "3-bedroom apartment in District 2",
    reportType: "False information",
    reportedBy: "Nguyen Van A",
    landlord: "Tran Thi B",
    status: "pending",
    createdAt: "2025-03-13T08:30:00Z",
  },
  {
    id: 2,
    listingTitle: "Studio apartment near university",
    reportType: "Misleading photos",
    reportedBy: "Le Van C",
    landlord: "Pham Thi D",
    status: "pending",
    createdAt: "2025-03-13T09:45:00Z",
  },
  {
    id: 3,
    listingTitle: "2-bedroom house with garden",
    reportType: "Scam",
    reportedBy: "Hoang Van E",
    landlord: "Vo Thi F",
    status: "pending",
    createdAt: "2025-03-13T10:15:00Z",
  },
  {
    id: 4,
    listingTitle: "Luxury apartment with river view",
    reportType: "Property doesn't exist",
    reportedBy: "Nguyen Van G",
    landlord: "Tran Van H",
    status: "resolved",
    createdAt: "2025-03-12T13:20:00Z",
    resolvedAt: "2025-03-12T16:45:00Z",
  },
  {
    id: 5,
    listingTitle: "Cozy room for rent near market",
    reportType: "Incorrect price",
    reportedBy: "Le Thi I",
    landlord: "Pham Van J",
    status: "rejected",
    createdAt: "2025-03-12T14:30:00Z",
    resolvedAt: "2025-03-12T17:10:00Z",
  },
];

export default function PostReportsPage() {
  return (
    <div className="flex overflow-hidden">
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Listing Reports</h1>
          <div className="text-sm text-muted-foreground">
            Pending:{" "}
            {
              listingReports.filter((report) => report.status === "pending")
                .length
            }{" "}
            reports
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reports Against Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Listing</TableHead>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Landlord</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listingReports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="cursor-pointer hover:bg-gray-200 border border-gray-100"
                  >
                    <TableCell className="font-semibold whitespace-normal break-words p-4">
                      {report.listingTitle}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {report.reportType}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {report.reportedBy}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {report.landlord}
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
                    <TableCell className="font-medium whitespace-normal break-words p-4 text-right">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/reports/listings/${report.id}`}>
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

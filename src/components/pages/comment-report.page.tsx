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

// Mock data for comment reports
const commentReports = [
  {
    id: 1,
    commentText: "This place is a complete scam! Don't waste your time!",
    reportType: "Inappropriate language",
    reportedBy: "Nguyen Van A",
    commentAuthor: "Tran Thi B",
    listingTitle: "2-bedroom apartment in District 3",
    status: "pending",
    createdAt: "2025-03-13T09:30:00Z",
  },
  {
    id: 2,
    commentText:
      "The landlord is dishonest and tried to charge extra fees not mentioned in the listing.",
    reportType: "False information",
    reportedBy: "Le Van C",
    commentAuthor: "Pham Thi D",
    listingTitle: "Studio apartment near university",
    status: "pending",
    createdAt: "2025-03-13T10:15:00Z",
  },
  {
    id: 3,
    commentText:
      "This listing is fake. I visited the address and there's no such property.",
    reportType: "Spam",
    reportedBy: "Hoang Van E",
    commentAuthor: "Vo Thi F",
    listingTitle: "Luxury apartment with river view",
    status: "pending",
    createdAt: "2025-03-13T11:45:00Z",
  },
  {
    id: 4,
    commentText:
      "The photos are completely misleading. The actual place is much smaller and dirtier.",
    reportType: "Harassment",
    reportedBy: "Nguyen Van G",
    commentAuthor: "Tran Van H",
    listingTitle: "3-bedroom house with garden",
    status: "resolved",
    createdAt: "2025-03-12T14:20:00Z",
    resolvedAt: "2025-03-12T16:30:00Z",
  },
  {
    id: 5,
    commentText: "Don't rent from this person. They never returned my deposit!",
    reportType: "Defamation",
    reportedBy: "Le Thi I",
    commentAuthor: "Pham Van J",
    listingTitle: "Cozy room for rent near market",
    status: "rejected",
    createdAt: "2025-03-12T15:10:00Z",
    resolvedAt: "2025-03-12T17:45:00Z",
  },
];

export default function CommentReportsPage() {
  return (
    <div className="flex overflow-hidden">
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Comment Reports</h1>
          <div className="text-sm text-muted-foreground">
            Pending:{" "}
            {
              commentReports.filter((report) => report.status === "pending")
                .length
            }{" "}
            reports
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reports Against Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comment</TableHead>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Comment Author</TableHead>
                  <TableHead>Listing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commentReports.map((report) => (
                  <TableRow key={report.id} className="cursor-pointer hover:bg-gray-200 border border-gray-100">
                    <TableCell className="font-semibold whitespace-normal break-words p-4">
                      {report.commentText}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {report.reportType}
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">{report.reportedBy}</TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">{report.commentAuthor}</TableCell>
                    <TableCell className="font-medium whitespace-normal break-words p-4">
                      {report.listingTitle}
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
                    <TableCell>
                      {new Date(report.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/reports/comments/${report.id}`}>
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

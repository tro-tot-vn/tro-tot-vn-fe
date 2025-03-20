import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Trash, XCircle } from "lucide-react";
import { Link, useParams } from "react-router";

export default function CommentReportDetailPage() {
  const params = useParams();

  // Mock data for a specific comment report
  const report = {
    id: Number.parseInt(params.commentId ?? "0"),
    commentText: "This place is a complete scam! Don't waste your time!",
    reportType: "Inappropriate language",
    reportReason:
      "The comment contains offensive language and makes unfounded accusations against the landlord.",
    reportedBy: {
      name: "Nguyen Van A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
    },
    commentAuthor: {
      name: "Tran Thi B",
      email: "tranthib@example.com",
      phone: "0912345678",
    },
    listing: {
      id: 123,
      title: "2-bedroom apartment in District 3",
      address: "45 Le Van Sy, District 3, HCMC",
    },
    status: "pending",
    createdAt: "2025-03-13T09:30:00Z",
  };

  return (
    <div className="flex">
      <main className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link to="/reports/comments">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Comment Report #{params.id}</h1>
          <Badge
            variant={
              report.status === "pending"
                ? "outline"
                : report.status === "resolved"
                ? "default"
                : "destructive"
            }
          >
            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reported Comment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-md mb-6">
                  <p className="italic">"{report.commentText}"</p>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>Posted by: {report.commentAuthor.name}</p>
                    <p>On listing: {report.listing.title}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Report Type</h3>
                    <p>{report.reportType}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Report Reason</h3>
                    <p>{report.reportReason}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Reported By</h3>
                    <p>{report.reportedBy.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.reportedBy.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {report.reportedBy.phone}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Report Date</h3>
                    <p>{new Date(report.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comment Author Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{report.commentAuthor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{report.commentAuthor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{report.commentAuthor.phone}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <Link
                      to={`/users/tenants/${report.commentAuthor.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      View User Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Listing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Title</p>
                    <p className="font-medium">{report.listing.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{report.listing.address}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <Link to={`/listings/approved/${report.listing.id}`}>
                      View Listing
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Moderation Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="remove">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="remove">Remove</TabsTrigger>
                    <TabsTrigger value="keep">Keep</TabsTrigger>
                  </TabsList>
                  <TabsContent value="remove">
                    <div className="space-y-4">
                      <p className="text-sm">
                        Remove this comment if it violates our community
                        guidelines. The comment author will be notified.
                      </p>
                      <Textarea placeholder="Reason for removal (will be sent to the comment author)" />
                      <div className="space-y-2">
                        <Button className="w-full" variant="destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Remove Comment
                        </Button>
                        <Button className="w-full" variant="outline">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Remove & Warn User
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="keep">
                    <div className="space-y-4">
                      <p className="text-sm">
                        Keep this comment if it doesn't violate our community
                        guidelines. The report will be dismissed.
                      </p>
                      <Textarea placeholder="Optional notes (internal only)" />
                      <Button className="w-full">
                        <XCircle className="mr-2 h-4 w-4" />
                        Dismiss Report
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Moderation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-muted pl-4 py-1">
                    <p className="text-sm font-medium">Report received</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(report.createdAt).toLocaleString()} by{" "}
                      {report.reportedBy.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

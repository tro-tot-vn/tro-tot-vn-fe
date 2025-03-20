import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Lock, XCircle } from "lucide-react";
import { Link, useParams } from "react-router";

export default function PostReportDetailPage() {
  const params = useParams();
  const report = {
    id: Number.parseInt(params.postId ?? "0"),
    listingTitle: "3-bedroom apartment in District 2",
    listingAddress: "123 Nguyen Van Linh, District 2, HCMC",
    listingPrice: "15,000,000 VND",
    listingArea: "85 m²",
    reportType: "False information",
    reportReason:
      "The listing claims to have 3 bedrooms, but when I visited, there were only 2 bedrooms. The photos are also misleading as they show a much larger space than the actual property.",
    reportedBy: {
      name: "Nguyen Van A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
    },
    landlord: {
      name: "Tran Thi B",
      email: "tranthib@example.com",
      phone: "0912345678",
    },
    listingImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    status: "pending",
    createdAt: "2025-03-13T08:30:00Z",
  };

  return (
    <div className="flex">
      <main className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link to="/reports/listings">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Listing Report #{params.id}</h1>
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
                <CardTitle>Reported Listing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {report.listingTitle}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p>{report.listingAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p>{report.listingPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Area</p>
                      <p>{report.listingArea}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Landlord</p>
                      <p>{report.landlord.name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {report.listingImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-md overflow-hidden"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Property image ${index + 1}`}
                          className="object-cover"
                        />
                      </div>
                    ))}
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
                <CardTitle>Landlord Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{report.landlord.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{report.landlord.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{report.landlord.phone}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <Link
                      to={`/users/landlords/${report.landlord.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      View Landlord Profile
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
                        Remove this listing if it violates our policies. The
                        landlord will be notified.
                      </p>
                      <Textarea placeholder="Reason for removal (will be sent to the landlord)" />
                      <div className="space-y-2">
                        <Button className="w-full" variant="destructive">
                          <Lock className="mr-2 h-4 w-4" />
                          Remove Listing
                        </Button>
                        <Button className="w-full" variant="outline">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Request Changes
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="keep">
                    <div className="space-y-4">
                      <p className="text-sm">
                        Keep this listing if it doesn't violate our policies.
                        The report will be dismissed.
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

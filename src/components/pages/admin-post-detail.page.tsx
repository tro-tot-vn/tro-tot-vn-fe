import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Link, useParams } from "react-router";

export default function PendingPostDetailPage() {
  const params = useParams();
  const listing = {
    id: Number.parseInt(params.postId?.toString() || "0"),
    title: "3-bedroom apartment in District 2",
    address: "123 Nguyen Van Linh, District 2, HCMC",
    price: "15,000,000 VND",
    area: "85 m²",
    rooms: 3,
    bathrooms: 2,
    electricityPrice: "3,500 VND/kWh",
    waterPrice: "15,000 VND/m³",
    internetPrice: "300,000 VND/month",
    cleaningFee: "200,000 VND/month",
    parkingFee: "100,000 VND/month",
    description:
      "Spacious 3-bedroom apartment in a quiet neighborhood. Fully furnished with modern amenities. Close to shopping centers, schools, and public transportation. Perfect for families or professionals.",
    amenities: [
      "Air conditioning",
      "Washing machine",
      "Refrigerator",
      "TV",
      "Balcony",
      "Security 24/7",
      "Elevator",
      "Swimming pool",
    ],
    landlord: {
      name: "Nguyen Van A",
      phone: "0901234567",
      email: "nguyenvana@example.com",
    },
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    submittedAt: "2025-03-12T08:30:00Z",
  };

  return (
    <div className="flex flex-1">
      <main className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link to="/a/posts/review-post/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">
            Review Listing #{params.postId}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{listing.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{listing.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">{listing.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="font-medium">{listing.area}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rooms</p>
                    <p className="font-medium">
                      {listing.rooms} bedrooms, {listing.bathrooms} bathrooms
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Pricing Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Electricity
                      </p>
                      <p>{listing.electricityPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Water</p>
                      <p>{listing.waterPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Internet</p>
                      <p>{listing.internetPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cleaning</p>
                      <p>{listing.cleaningFee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Parking</p>
                      <p>{listing.parkingFee}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p>{listing.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {listing.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Images</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {listing.images.map((image, index) => (
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
                    <p className="font-medium">{listing.landlord.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{listing.landlord.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{listing.landlord.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted</p>
                    <p className="font-medium">
                      {new Date(listing.submittedAt).toLocaleString()}
                    </p>
                  </div>
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
                <Tabs defaultValue="approve">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="approve">Approve</TabsTrigger>
                    <TabsTrigger value="reject">Reject</TabsTrigger>
                  </TabsList>
                  <TabsContent value="approve">
                    <div className="space-y-4">
                      <p className="text-sm">
                        Approve this listing to make it visible to all users.
                        The landlord will be notified.
                      </p>
                      <Textarea placeholder="Optional notes for approval (internal only)" />
                      <Button className="w-full" size="lg">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Listing
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="reject">
                    <div className="space-y-4">
                      <p className="text-sm">
                        Reject this listing if it violates our policies. The
                        landlord will be notified with your reason.
                      </p>
                      <Textarea
                        placeholder="Reason for rejection (will be sent to landlord)"
                        required
                      />
                      <Button
                        variant="destructive"
                        className="w-full"
                        size="lg"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject Listing
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
                    <p className="text-sm font-medium">Listing submitted</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(listing.submittedAt).toLocaleString()} by{" "}
                      {listing.landlord.name}
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

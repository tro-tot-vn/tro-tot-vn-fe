import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import adminService from "@/services/admin.service";
import { message } from "antd";

export default function PendingPostDetailPage() {
  const params = useParams();
  const location = useLocation();
  const postData = location.state;
  const postId = params.postId;
  const postDetail = postData.find((item) => item.postId.toString() === postId);
  const address = `${postDetail.street} ${postDetail.ward}, ${postDetail.district}, ${postDetail.city}`
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  
  const [tabValue, setTabValue] = useState("Approved");
  const [approvalNotes, setApprovalNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

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

  if (!postDetail) {
    return <div>Không tìm thấy bài viết.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tabValue === "Approved") {
      const result = await adminService.changStatus(tabValue, approvalNotes, postDetail.postId);
      console.log(result)
      if(result){
        if(result.status === 200){
          messageApi.success("Duyệt bài đăng thành công");
          setTimeout(() => navigate('/admin/posts/review-post'), 1000);
        }else if(result.status === 404){
          messageApi.error("Không tìm thấy bài viết hoặc trạng thái không thay đổi");
        }else if (result.status === 500) {
          messageApi.error("Lỗi hệ thống, vui lòng thử lại sau");
      } else {
          messageApi.error("Đã có lỗi xảy ra");
        }
      }
    } else {
      const result = await adminService.changStatus(tabValue, rejectionReason, postDetail.postId);
      if(result){
        if(result.status === 200){
          messageApi.success("Từ chối bài đăng thành công");
          setTimeout(() => navigate('/admin/posts/review-post'), 1000);
        }else if(result.status == 400){
          messageApi.error("Lý do từ chối là bắt buộc khi trạng thái là 'Từ chối'");
        }else if(result.status === 404){
          messageApi.error("Không tìm thấy bài viết hoặc trạng thái không thay đổi");
        }else if (result.status === 500) {
          messageApi.error("Lỗi hệ thống, vui lòng thử lại sau");
      } else {
          messageApi.error("Đã có lỗi xảy ra");
        }
      }
    }
  };

  return (
    <>
    {contextHolder}

    <div className="flex flex-1">
      <main className="flex-1 p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="icon" asChild>
              <Link to="/admin/posts/review-post/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">
              Review Listing #{postDetail.postId}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{postDetail.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-medium">{postDetail.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Area</p>
                      <p className="font-medium">{postDetail.acreage}  m²</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rooms</p>
                      <p className="font-medium">
                        {postDetail.interiorCondition === "None"? "Phòng không nội thất": "Phòng full nội thất"}
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
                        <p>3,500 VND/kWh</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Water</p>
                        <p>15,000 VND/m³</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Internet</p>
                        <p>300,000 VND/month</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cleaning</p>
                        <p>200,000 VND/month</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Parking</p>
                        <p>100,000 VND/month</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p>{postDetail.description}</p>
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
                      <p className="font-medium">
                        {postDetail.owner.firstName} {postDetail.owner.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{postDetail.owner.account.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{postDetail.owner.account.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium">
                        {new Date(postDetail.createdAt).toLocaleString()}
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
                  <Tabs defaultValue="Approved" onValueChange={setTabValue}>
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="Approved">Approve</TabsTrigger>
                      <TabsTrigger value="Rejected">Reject</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Approved">
                      <div className="space-y-4">
                        <p className="text-sm">
                          Approve this listing to make it visible to all users.
                          The landlord will be notified.
                        </p>
                        <Textarea
                          placeholder="Optional notes for approval (internal only)"
                          value={approvalNotes}
                          onChange={(e) => setApprovalNotes(e.target.value)}
                        />
                        <Button className="w-full" size="lg" type="submit">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve Listing
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="Rejected">
                      <div className="space-y-4">
                        <p className="text-sm">
                          Reject this listing if it violates our policies. The
                          landlord will be notified with your reason.
                        </p>
                        <Textarea
                          placeholder="Reason for rejection (will be sent to landlord)"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          required
                        />
                        <Button
                          variant="destructive"
                          className="w-full"
                          size="lg"
                          type="submit"
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
                        3/12/2025, 3:30:00 PM by Nguyen Van A
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
    </>
  );
}

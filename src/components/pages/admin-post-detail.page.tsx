import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import adminService from "@/services/admin.service";
import { message } from "antd";
import useAuth from "@/hooks/use-auth";
import { PostMoratorHistoryResponse } from "@/services/types/postModerateHistory-response";
import { PostResponse } from "@/services/types/post-response";

export default function PendingPostDetailPage() {
  const { user } = useAuth();
  const  accountId  = user?.accountId;
  const params = useParams();
  const location = useLocation();
  const postDetail = location.state as PostResponse ;
  const address = `${postDetail?.streetNumber} , ${postDetail.street} ${postDetail.ward}, ${postDetail.district}, ${postDetail.city}`
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [history, setHistory] = useState<PostMoratorHistoryResponse[]>([]);
  
  const [tabValue, setTabValue] = useState("Approved");
  const [approvalNotes, setApprovalNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");


  if (!postDetail) {
    return <div>Không tìm thấy bài viết.</div>;
  }

  const fetchApi = async () => {
    try {
      const result = await adminService.getPostModeratorHistory(postDetail.postId);
      console.log("result", result);
      if (result) {
        if (result.status === 200) {
          if (result.data) {
            setHistory(Array.isArray(result.data) ? result.data : []);
          }
        } else if (result.status === 404) {
          console.log("Không tìm thấy lịch sử bài viết");
        } else if (result.status === 500) {
          console.log("Lỗi hệ thống, vui lòng thử lại sau");
        } else {
          console.log("Đã có lỗi xảy ra");
        }
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tabValue === "Approved") {
      const result = await adminService.changStatus(tabValue, approvalNotes, postDetail.postId);
      console.log(result)
      if(result){
        if(result.status === 200){
          messageApi.success("Duyệt bài đăng thành công");
          if (accountId !== undefined) {
            await adminService.savePostModeratorHistory(accountId, postDetail.postId, tabValue, approvalNotes);
          } else {
            messageApi.error("Account ID is missing. Unable to save moderator history.");
          }
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
          if (accountId !== undefined) {
            await adminService.savePostModeratorHistory(accountId, postDetail.postId ,tabValue, rejectionReason);
            console.log("result", rejectionReason);
          } else {
            messageApi.error("Account ID is missing. Unable to save moderator history.");
          }

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
  console.log(postDetail.description);

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
                    <h3 className="font-medium mb-2">Description</h3>
                    <p>{postDetail.description}</p>
                  </div>

                  <div  >
                    <h3 className="font-medium mb-2">Images</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {postDetail.multimediaFiles.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-md overflow-hidden"
                        >
                          <img
                            src={`http://localhost:3333/api/files/${image.fileId}`}
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
                    {history.length > 0 ? (
                     history.map((item, index) => (
                      <div key={item.historyId ?? index} className="border-l-2 border-muted pl-4 py-1">
                        <p className="text-sm font-medium">Listing {item.actionType}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.execAt).toLocaleString()} by Admin {item.admin.lastName} {item.admin.firstName}
                        </p>
                        <p className="text-xs">Result: {item.reason}</p>
                      </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No history available</p>
                    )}
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

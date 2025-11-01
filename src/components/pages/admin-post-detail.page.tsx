import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import adminService from "@/services/admin.service";
import { message } from "antd";
import { PostMoratorHistoryResponse } from "@/services/types/postModerateHistory-response";
import { PostResponse } from "@/services/types/post-response";
import { Image } from "antd";
import NotFoundPage from "./not-found.page";
import { FileType } from "@/services/types/get-list-post-by-status-reponse";
import { getFileUrl } from "@/config/env";

export default function PendingPostDetailPage() {
  const location = useLocation();
  const postDetail = location.state as PostResponse;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [history, setHistory] = useState<PostMoratorHistoryResponse[]>([]);

  const [tabValue, setTabValue] = useState("Approved");
  const [approvalNotes, setApprovalNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchApi = async () => {
    try {
      const result = await adminService.getPostModeratorHistory(
        postDetail.postId
      );
      console.log("history", history);
      console.log("postId", postDetail.postId);
      console.log("result", result);
      if (result) {
        if (result.status === 200) {
          if (result.data) {
            setHistory(Array.isArray(result.data) ? result.data : []);
          }
        } else if (result.status === 404) {
          console.log("Không tìm thấy lịch sử tin");
        } else if (result.status === 500) {
          console.log("Lỗi hệ thống, vui lòng thử lại sau");
        } else {
          console.log("Đã có lỗi xảy ra");
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tabValue === "Approved") {
      const result = await adminService.changStatus(
        tabValue,
        approvalNotes,
        postDetail.postId
      );
      console.log(result);
      if (result) {
        if (result.status === 200) {
          messageApi.success("Duyệt bài đăng thành công");
          setTimeout(() => navigate("/admin/posts/review-post"), 1000);
        } else if (result.status === 404) {
          messageApi.error(
            "Không tìm thấy tin hoặc trạng thái không thay đổi"
          );
        } else if (result.status === 500) {
          messageApi.error("Lỗi hệ thống, vui lòng thử lại sau");
        } else {
          messageApi.error("Đã có lỗi xảy ra");
        }
      }
    } else {
      const result = await adminService.changStatus(
        tabValue,
        rejectionReason,
        postDetail.postId
      );
      if (result) {
        if (result.status === 200) {
          messageApi.success("Từ chối bài đăng thành công");

          setTimeout(() => navigate("/admin/posts/review-post"), 1000);
        } else if (result.status == 400) {
          messageApi.error(
            "Lý do từ chối là bắt buộc khi trạng thái là 'Từ chối'"
          );
        } else if (result.status === 404) {
          messageApi.error(
            "Không tìm thấy tin hoặc trạng thái không thay đổi"
          );
        } else if (result.status === 500) {
          messageApi.error("Lỗi hệ thống, vui lòng thử lại sau");
        } else {
          messageApi.error("Đã có lỗi xảy ra");
        }
      }
    }
  };
  console.log("history", history);

  return (
    <>
      {contextHolder}
      {postDetail ? (
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
                  Duyệt Bài Đăng #{postDetail.postId}
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
                          <p className="text-sm text-muted-foreground">
                            Địa chỉ
                          </p>
                          <p className="font-medium">{`${postDetail?.streetNumber} , ${postDetail.street} ${postDetail.ward}, ${postDetail.district}, ${postDetail.city}`}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Giá</p>
                          <p className="font-medium">{postDetail.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Diện tích
                          </p>
                          <p className="font-medium">{postDetail.acreage} m²</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Số phòng
                          </p>
                          <p className="font-medium">
                            {postDetail.interiorCondition === "None"
                              ? "Phòng không nội thất"
                              : "Phòng full nội thất"}
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-medium mb-2">Mô tả</h3>
                        <p>{postDetail.description}</p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Hình ảnh</h3>
                        <Image.PreviewGroup>
                          {postDetail.multimediaFiles.map((file, index) =>
                            file.file.fileType === FileType.IMAGE ? (
                              <Image
                                key={index}
                                width={300}
                                src={getFileUrl(file.file.fileId)}
                                alt={`Hình ảnh tài sản ${index + 1}`}
                                style={{ borderRadius: 8 }}
                              />
                            ) : file.file.fileType === FileType.VIDEO ? (
                              <video
                                key={index}
                                width={300}
                                controls
                                style={{ borderRadius: 8 }}
                              >
                                <source
                                  src={getFileUrl(file.file.fileId)}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <> </>
                            )
                          )}
                        </Image.PreviewGroup>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Thông tin Chủ Nhà</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Tên</p>
                          <p className="font-medium">
                            {postDetail.owner.firstName}{" "}
                            {postDetail.owner.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Số điện thoại
                          </p>
                          <p className="font-medium">
                            {postDetail.owner.account.phone}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">
                            {postDetail.owner.account.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Ngày đăng
                          </p>
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
                      <CardTitle>Hành động duyệt</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="Approved" onValueChange={setTabValue}>
                        <TabsList className="grid grid-cols-2 mb-4">
                          <TabsTrigger value="Approved">Duyệt</TabsTrigger>
                          <TabsTrigger value="Rejected">Từ chối</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Approved">
                          <div className="space-y-4">
                            <p className="text-sm">
                              Duyệt bài đăng này để hiển thị cho tất cả người
                              dùng. Chủ nhà sẽ nhận được thông báo.
                            </p>
                            <Textarea
                              placeholder="Ghi chú duyệt (chỉ nội bộ)"
                              value={approvalNotes}
                              onChange={(e) => setApprovalNotes(e.target.value)}
                            />
                            <Button className="w-full" size="lg" type="submit">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Duyệt bài đăng
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="Rejected">
                          <div className="space-y-4">
                            <p className="text-sm">
                              Từ chối bài đăng này nếu nó vi phạm chính sách của
                              chúng tôi. Chủ nhà sẽ nhận được lý do từ chối.
                            </p>
                            <Textarea
                              placeholder="Lý do từ chối (sẽ gửi đến chủ nhà)"
                              value={rejectionReason}
                              onChange={(e) =>
                                setRejectionReason(e.target.value)
                              }
                              required
                            />
                            <Button
                              variant="destructive"
                              className="w-full"
                              size="lg"
                              type="submit"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Từ chối bài đăng
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Lịch sử duyệt bài</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {history.length > 0 ? (
                          history.map((item, index) => (
                            <div
                              key={item.historyId ?? index}
                              className="border-l-2 border-muted pl-4 py-1"
                            >
                              <p className="text-sm font-medium">
                                tin {item.actionType}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(item.execAt).toLocaleString()} bởi
                                Admin {item.admin.lastName}{" "}
                                {item.admin.firstName}
                              </p>
                              <p className="text-xs">Kết quả: {item.reason}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Không có lịch sử duyệt bài
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </main>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

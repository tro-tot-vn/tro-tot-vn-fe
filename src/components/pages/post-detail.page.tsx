import { Card } from "@/components/ui/card";
import { ImageGallery } from "@/components/elements/image-gallery";
import { PropertyDetails } from "@/components/elements/property-details";
import { SellerInfo } from "@/components/elements/seller-info";
import { RatingsReviews } from "@/components/elements/ratings-reviews";
import { useEffect, useState } from "react";
import { PostService } from "@/services/post.service";
import { GetDetailPostResponse } from "@/services/types/get-detail-post.response";
import { Button } from "../ui/button";
import useAuth from "@/hooks/use-auth";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { LoaderCircle } from "lucide-react";
import NotFoundPage from "./not-found.page";
import { CustomerService } from "@/services/customer.service";

const postService = new PostService();
const customerService = new CustomerService();

export default function PostDetailPage() {
  const auth = useAuth();
  const postId = Number(useParams().postId);
  const navigate = useNavigate();
  const [postData, setPostData] = useState<GetDetailPostResponse | null>(null);
  const [isNotFound, setNotFound] = useState(false);

  const addToSavedPosts = async (postId: number) => {
    const res = await customerService.addToSavedPosts(postId);
    if (res.status === 200) {
      toast.success("Đã thêm vào danh sách đã lưu");
    } else if (res.status === 400) {
      if (res.data.message === "POST_ALREADY_SAVED") {
        toast.error("Bài viết đã có trong danh sách đã lưu");
      } else if (res.data.message === "POST_NOT_FOUND") {
        toast.error("Bài viết không tồn tại");
      }
    } else {
      toast.error("Lỗi khi thêm vào danh sách đã lưu");
    }
  };
  useEffect(() => {
    postService.getDetailPost(Number(postId)).then((res) => {
      if (res.status === 200) {
        setPostData(res.data.data);
      } else if (res.status === 404) {
        setNotFound(true);
      } else {
        toast.error("Lỗi khi tải dữ liệu bài đăng");
      }
    });
    customerService.addHistortyViewPost(postId).then((res) => {
      if (res.status === 200) {
        console.log("Thêm lịch sử xem thành công");
      } else {
        console.log("Lỗi khi thêm lịch sử xem bài viết");
      }
    }
    );
    
  }, [postId]);

  if (isNaN(postId)) {
    return <NotFoundPage />;
  }
  return (
    <>
      {postData ? (
        <main className="flex-1 py-8 px-8">
          <div className="container mx-auto px-4">
            {/* Thay đổi layout từ grid sang flex-col */}
            <div className="flex flex-col">
              {/* Phần hình ảnh và thông tin chính */}
              <div>
                <ImageGallery
                  data={postData.multimediaFiles}
                  addToSavedPosts={() => {
                    addToSavedPosts(postData.postId);
                  }}
                />
                <h1 className="text-2xl font-bold mt-6 mb-4">
                  {postData.title}
                </h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-orange-500">
                    {postData.price.toLocaleString("vi-VN")} VNĐ / tháng
                  </span>
                </div>
                <PropertyDetails postData={postData} />
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Mô tả chi tiết</h2>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="mb-2">
                      SĐT Liên hệ:{" "}
                      {auth.isAuthenticated
                        ? postData.owner.account.phone
                        : postData.owner.account.phone.slice(0, -3) + "***"}
                      {!auth.isAuthenticated && (
                        <Button
                          onClick={() => {
                            toast.error("Vui lòng đăng nhập để xem SĐT", {
                              duration: 3000,
                              action: {
                                label: "Đăng nhập",
                                onClick: () => {
                                  navigate("/login");
                                },
                              },
                            });
                          }}
                          variant="ghost"
                          className="text-blue-500 hover:underline"
                        >
                          Hiện SĐT
                        </Button>
                      )}
                    </p>
                    <div className="relative">
                      <div
                        className="overflow-hidden max-h-24 transition-all duration-300"
                        id="description-content"
                      >
                        <p>{postData.description}</p>
                      </div>
                      <button
                        className="text-blue-500 hover:underline mt-2"
                        onClick={(event) => {
                          const content = document.getElementById(
                            "description-content"
                          );
                          if (content) {
                            if (content.style.maxHeight === "none") {
                              content.style.maxHeight = "6rem";
                              (event.target as HTMLButtonElement).innerText =
                                "Xem thểm";
                            } else {
                              content.style.maxHeight = "none";
                              (event.target as HTMLButtonElement).innerText =
                                "Thu gọn";
                            }
                          }
                        }}
                      >
                        Xem thêm
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Xem trên bản đồ</h2>
                  <div className="h-64 bg-gray-300 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      style={{ border: 0 }}
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDDNu6RXhhzn6OpjxnD886FhA7owrg2yYk&&q=${
                        postData.streetNumber +
                        postData.street +
                        postData.ward +
                        postData.district +
                        postData.city
                      }`}
                    ></iframe>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-4 mt-4">
                  Thông tin người đăng
                </h2>

                {/* Thông tin người đăng - đã di chuyển xuống dưới phần bản đồ */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <SellerInfo customerInformation={postData.owner} />
                  </div>
                  <Card className="p-4">
                    <h2 className="font-bold mb-2">Nhắn tin nhanh:</h2>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200">
                        Nhà này còn không ạ?
                      </button>
                      <button className="w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200">
                        Thời hạn thuê?
                      </button>
                    </div>
                  </Card>
                </div>

                {/* Phần đánh giá */}
                <RatingsReviews postId={postId} />
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="flex flex-1 justify-center items-center h-screen">
          {isNotFound ? (
            <NotFoundPage></NotFoundPage>
          ) : (
            <LoaderCircle className="animate-spin"></LoaderCircle>
          )}
        </div>
      )}
    </>
  );
}

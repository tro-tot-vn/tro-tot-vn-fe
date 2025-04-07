import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SearchIcon,
  MapPin,
  Heart,
  ChevronRight,
  DollarSignIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAuth from "@/hooks/use-auth";
import { toast } from "sonner";
import { PostService } from "@/services/post.service";
import { useEffect, useState } from "react";
import { ListPostRes } from "@/services/types/get-list-post-by-status-reponse";

const popularLocations = [
  { id: 1, name: "TP. Hồ Chí Minh", count: 100 },
  { id: 2, name: "Hà Nội", count: 112 },
  { id: 3, name: "Đà Nẵng", count: 50 },
  { id: 4, name: "Cần Thơ", count: 40 },
  { id: 5, name: "Bình Dương", count: 80 },
];

// Sample new listings

const postService = new PostService();
export default function HomePage() {
  const [latestPost, setLatestPost] = useState<ListPostRes[]>([]);
  useEffect(() => {
    postService.getLatestPost(4).then((res) => {
      console.log(res.data);
      if (res.data.status === 200) {
        setLatestPost(res.data.data || []);
      }
    });
  }, []);
  const nav = useNavigate();
  const auth = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#ff6d0b]/90 to-[#ff6d0b] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Tìm phòng trọ phù hợp với bạn
              </h1>
              <p className="text-xl opacity-90">
                Hàng ngàn phòng trọ chất lượng đang chờ đợi bạn
              </p>
            </div>
            <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-lg">
              <div defaultValue="rent">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Tìm phòng trọ ..."
                        className="pl-10 py-6 border-gray-300"
                      />
                    </div>
                    <Button className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white py-6">
                      Tìm Kiếm
                    </Button>
                  </div>
                </div>
              </div>
              {/* Filter Section */}
              <section className="pt-6 bg-white">
                <div className="container mx-auto px-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium">Lọc theo:</span>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs"
                      >
                        Giá <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs"
                      >
                        Diện tích <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs"
                      >
                        Vị trí <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs"
                      >
                        Thêm bộ lọc <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* Popular Locations */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Khu vực phổ biến</h2>
              <Link
                to="/locations"
                className="text-[#ff6d0b] hover:underline text-sm flex items-center"
              >
                {/* Xem tất cả <ChevronRight className="h-4 w-4" /> */}
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {popularLocations.map((location) => (
                <Link key={location.id} to={`/location/${location.id}`}>
                  <Card className="hover:border-[#ff6d0b]/50 transition-colors h-full">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <h3 className="font-medium mb-1">{location.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Listings */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Phòng trọ mới đăng</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestPost.map((post) => (
                <Card
                  key={post.postId}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={
                        post.multimediaFiles[0]?.fileId
                          ? `http://localhost:3333/api/files/${post.multimediaFiles[0].fileId}`
                          : "/placeholder.svg"
                      }
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 left-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Lưu tin</span>
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <Link to={`/posts/${post.postId}/detail`}>
                      <h3 className="font-medium line-clamp-2 mb-2 hover:text-[#ff6d0b]">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="flex flex-col justify-between items-start mb-1">
                      <div className="flex flex-row items-center gap-2">
                        <DollarSignIcon className="h-3 w-3 mr-1" />
                        <p className="font-bold text-[#ff6d0b]">
                          {Number(post.price).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}{" "}
                          VND
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-[150px]">
                          {post.city}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span>{post.acreage} m2</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {(() => {
                        const postDate = new Date(post.createdAt);
                        const today = new Date();
                        const diffTime = Math.abs(
                          today.getTime() - postDate.getTime()
                        );
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24)
                        );

                        if (diffDays === 0) {
                          return "Hôm nay";
                        } else if (diffDays <= 7) {
                          return `${diffDays} ngày trước`;
                        } else {
                          return "7+ ngày trước";
                        }
                      })()}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center">
              Tại sao chọn chúng tôi?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-[#ff6d0b]/10 flex items-center justify-center text-[#ff6d0b] mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-shield-check"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    An toàn & Đáng tin cậy
                  </h3>
                  <p className="text-gray-500">
                    Tất cả phòng trọ đều được kiểm duyệt và xác thực thông tin
                    trước khi đăng tải
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-[#ff6d0b]/10 flex items-center justify-center text-[#ff6d0b] mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Tìm kiếm dễ dàng</h3>
                  <p className="text-gray-500">
                    Hệ thống tìm kiếm thông minh giúp bạn nhanh chóng tìm được
                    phòng trọ phù hợp
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-[#ff6d0b]/10 flex items-center justify-center text-[#ff6d0b] mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-zap"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Cập nhật liên tục
                  </h3>
                  <p className="text-gray-500">
                    Hàng ngàn tin đăng mới mỗi ngày, đảm bảo bạn luôn tìm được
                    phòng trọ mới nhất
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-r from-[#ff6d0b]/90 to-[#ff6d0b]">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Bạn có phòng trọ cần cho thuê?
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Đăng tin ngay để tiếp cận hàng ngàn khách hàng tiềm năng trên nền
              tảng của chúng tôi
            </p>
            <Button
              size="lg"
              className="bg-white text-[#ff6d0b] hover:bg-gray-100"
              onClick={() => {
                if (auth.user?.role.roleName === "Customer") {
                  nav("/my-posts/create-post");
                } else {
                  toast("Chức năng này không khả dụng với bạn");
                }
              }}
            >
              Đăng tin ngay
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

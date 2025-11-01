"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon, MapPin, Heart, DollarSignIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAuth from "@/hooks/use-auth";
import { toast } from "sonner";
import { PostService } from "@/services/post.service";
import { recommendService } from "@/services/recommend.service";
import { useEffect, useState } from "react";
import type { ListPostRes } from "@/services/types/get-list-post-by-status-reponse";
import { AreaRangeFilter } from "../elements/area-range-filter";
import { InteriorConditionFilter } from "../elements/interior-condition-filter";
import { LocationFilter } from "../elements/location-filter";
import { PriceRangeFilter } from "../elements/price-range-filter";
import { getFileUrl } from "@/config/env";

const popularLocations = [
  { id: 1, name: "TP. Hồ Chí Minh", count: 100 },
  { id: 2, name: "Hà Nội", count: 112 },
  { id: 3, name: "Đà Nẵng", count: 50 },
  { id: 4, name: "Cần Thơ", count: 40 },
  { id: 5, name: "Bình Dương", count: 80 },
];

const postService = new PostService();
export default function HomePage() {
  const nav = useNavigate();
  const auth = useAuth();
  
  const [latestPost, setLatestPost] = useState<ListPostRes[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    minPrice: null as number | null,
    maxPrice: null as number | null,
    minArea: null as number | null,
    maxArea: null as number | null,
    city: null as string | null,
    district: null as string | null,
    ward: null as string | null,
    interiorCondition: null as string | null,
  });

  // Recommendation state
  const [allRecommendations, setAllRecommendations] = useState<ListPostRes[]>([]);
  const [displayedCount, setDisplayedCount] = useState(10);

  useEffect(() => {
    postService.getLatestPost(4).then((res) => {
      console.log(res.data);
      if (res.data.status === 200) {
        setLatestPost(res.data.data || []);
      }
    });
  }, []);

  // Fetch recommendations once on mount if user is logged in
  useEffect(() => {
    if (auth.user) {
      recommendService.getRecommendations(100)
        .then((result) => {
          setAllRecommendations(result.posts);
          console.log(`[HomePage] Loaded ${result.posts.length} recommendations`);
        })
        .catch((error) => {
          console.error('[HomePage] Failed to load recommendations:', error);
        });
    }
  }, [auth.user]);

  const handleSearch = () => {
    // In a real application, you would use the search query and filters to fetch filtered results
    console.log("Search with:", {
      query: searchQuery,
      filters,
    });

    // For demonstration purposes, show a toast with the filter values
    const filterText = [];
    if (filters.minPrice !== null || filters.maxPrice !== null) {
      filterText.push(
        `Giá: ${filters.minPrice || 0} - ${
          filters.maxPrice || "không giới hạn"
        }`
      );
    }
    if (filters.minArea !== null || filters.maxArea !== null) {
      filterText.push(
        `Diện tích: ${filters.minArea || 0} - ${
          filters.maxArea || "không giới hạn"
        } m²`
      );
    }
    if (filters.city) {
      let locationText = `Vị trí: ${filters.city}`;
      if (filters.district) {
        locationText += `, ${filters.district}`;
        if (filters.ward) {
          locationText += `, ${filters.ward}`;
        }
      }
      filterText.push(locationText);
    }
    if (filters.interiorCondition) {
      filterText.push(
        `Nội thất: ${
          filters.interiorCondition === "Full" ? "Đầy đủ nội thất" : "Trống"
        }`
      );
    }

    nav(
      `/search?` +
        new URLSearchParams({
          q: searchQuery,
          minPrice: filters.minPrice?.toString() || "",
          maxPrice: filters.maxPrice?.toString() || "",
          minArea: filters.minArea?.toString() || "",
          maxArea: filters.maxArea?.toString() || "",
          city: filters.city || "",
          district: filters.district || "",
          ward: filters.ward || "",
          interiorCondition: filters.interiorCondition || "",
        }).toString()
    );
  };

  const handlePriceFilterChange = (
    minPrice: number | null,
    maxPrice: number | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      minPrice,
      maxPrice,
    }));
  };

  const handleAreaFilterChange = (
    minArea: number | null,
    maxArea: number | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      minArea,
      maxArea,
    }));
  };

  const handleLocationFilterChange = (
    city: string | null,
    district: string | null,
    ward: string | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      city,
      district,
      ward,
    }));
  };

  const handleInteriorConditionFilterChange = (condition: string | null) => {
    setFilters((prev) => ({
      ...prev,
      interiorCondition: condition,
    }));
  };

  const handleLoadMoreRecommendations = () => {
    setDisplayedCount((prev) => prev + 10);
  };

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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button
                      className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white py-6"
                      onClick={handleSearch}
                    >
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
                      <LocationFilter
                        onFilterChange={handleLocationFilterChange}
                      />
                      <PriceRangeFilter
                        onFilterChange={handlePriceFilterChange}
                      />
                      <AreaRangeFilter
                        onFilterChange={handleAreaFilterChange}
                      />
                      <InteriorConditionFilter
                        onFilterChange={handleInteriorConditionFilterChange}
                      />
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
                <Card
                  key={location.id}
                  className="hover:border-[#ff6d0b]/50 transition-colors h-full"
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <h3 className="font-medium mb-1">{location.name}</h3>
                  </CardContent>
                </Card>
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
                          ? getFileUrl(post.multimediaFiles[0].fileId)
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

        {/* Recommendations Section */}
        {auth.user && allRecommendations.length > 0 && (
          <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gợi ý cho bạn</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {allRecommendations.slice(0, displayedCount).map((post) => (
                  <Card
                    key={post.postId}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={
                          post.multimediaFiles[0]?.fileId
                            ? getFileUrl(post.multimediaFiles[0].fileId)
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
              {displayedCount < allRecommendations.length && (
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={handleLoadMoreRecommendations}
                    className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
                  >
                    Xem thêm
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

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

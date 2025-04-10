import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SearchIcon,
  MapPin,
  Heart,
  DollarSignIcon,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router";
import {
  ListPostRes,
} from "@/services/types/get-list-post-by-status-reponse";
import { AreaRangeFilter } from "../elements/area-range-filter";
import { InteriorConditionFilter } from "../elements/interior-condition-filter";
import { LocationFilter } from "../elements/location-filter";
import { PriceRangeFilter } from "../elements/price-range-filter";
import { PostService } from "@/services/post.service";

const postService = new PostService();

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState({
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : null,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : null,
    minArea: searchParams.get("minArea")
      ? Number(searchParams.get("minArea"))
      : null,
    maxArea: searchParams.get("maxArea")
      ? Number(searchParams.get("maxArea"))
      : null,
    city: searchParams.get("city") || null,
    district: searchParams.get("district") || null,
    ward: searchParams.get("ward") || null,
    interiorCondition: searchParams.get("interiorCondition") || null,
  });

  // Results state
  const [results, setResults] = useState<ListPostRes[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<number>(0);
  const [totalResults, setTotalResults] = useState(0);

  // Mock API call to fetch search results
  const fetchSearchResults = async (cursor = 0) => {
    setLoading(true);

    postService
      .searchPost(
        searchQuery,
        filters.minPrice !== null ? filters.minPrice.toString() : undefined,
        filters.maxPrice !== null ? filters.maxPrice.toString() : undefined,
        filters.minArea !== null ? filters.minArea.toString() : undefined,
        filters.maxArea !== null ? filters.maxArea.toString() : undefined,
        filters.city || undefined,
        filters.district || undefined,
        filters.ward || undefined,
        filters.interiorCondition || undefined,
        cursor
      )
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          setResults((prev) => [...prev, ...(res.data.data?.dataPag || [])]);
          setNextCursor(res.data.data?.nextCursor || 0);
          setHasMore(res.data.data?.hasMore || false);
          setTotalResults(res.data.data?.dataPag.length || 0);
        } else {
          setResults([]);
          setNextCursor(0);
          setHasMore(false);
          setTotalResults(0);
        }
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
        setResults([]);
        setNextCursor(0);
        setHasMore(false);
        setTotalResults(0);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update URL with search params
  const updateSearchParams = () => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("q", searchQuery);
    if (filters.minPrice !== null)
      params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== null)
      params.set("maxPrice", filters.maxPrice.toString());
    if (filters.minArea !== null)
      params.set("minArea", filters.minArea.toString());
    if (filters.maxArea !== null)
      params.set("maxArea", filters.maxArea.toString());
    if (filters.city) params.set("city", filters.city);
    if (filters.district) params.set("district", filters.district);
    if (filters.ward) params.set("ward", filters.ward);
    if (filters.interiorCondition)
      params.set("interiorCondition", filters.interiorCondition);

    navigate(`/search?${params.toString()}`);
  };

  // Handle search
  const handleSearch = () => {
    updateSearchParams();
    fetchSearchResults(0);
  };

  // Handle filter changes
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

  // Load more results
  const loadMore = () => {
    if (hasMore && !loading) {
      fetchSearchResults(nextCursor);
    }
  };

  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Hôm nay";
    } else if (diffDays <= 7) {
      return `${diffDays} ngày trước`;
    } else {
      return "7+ ngày trước";
    }
  };

  // Initial fetch on mount and when URL params change
  useEffect(() => {
    // Set initial filter values from URL params
    const initialFilters = {
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : null,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : null,
      minArea: searchParams.get("minArea")
        ? Number(searchParams.get("minArea"))
        : null,
      maxArea: searchParams.get("maxArea")
        ? Number(searchParams.get("maxArea"))
        : null,
      city: searchParams.get("city") || null,
      district: searchParams.get("district") || null,
      ward: searchParams.get("ward") || null,
      interiorCondition: searchParams.get("interiorCondition") || null,
    };

    setFilters(initialFilters);
    setSearchQuery(searchParams.get("q") || "");

    fetchSearchResults();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search - Similar to Home Page */}
      <section className="bg-gradient-to-r from-[#ff6d0b]/90 to-[#ff6d0b] py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Tìm phòng trọ phù hợp với bạn
            </h1>
            <p className="text-lg opacity-90">
              Hàng ngàn phòng trọ chất lượng đang chờ đợi bạn
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm phòng trọ ..."
                    className="pl-10 py-6 border-gray-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
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

            {/* Filter Section */}
            <div className="pt-6 bg-white">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium">Lọc theo:</span>
                <div className="flex flex-wrap gap-2">
                  <LocationFilter
                    onFilterChange={handleLocationFilterChange}
                    initialCity={filters.city}
                    initialDistrict={filters.district}
                    initialWard={filters.ward}
                  />
                  <PriceRangeFilter
                    onFilterChange={handlePriceFilterChange}
                    initialMinPrice={filters.minPrice}
                    initialMaxPrice={filters.maxPrice}
                  />
                  <AreaRangeFilter
                    onFilterChange={handleAreaFilterChange}
                    initialMinArea={filters.minArea}
                    initialMaxArea={filters.maxArea}
                  />
                  <InteriorConditionFilter
                    onFilterChange={handleInteriorConditionFilterChange}
                    initialCondition={filters.interiorCondition}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        {/* Results Summary */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold">
            {loading && nextCursor === 0 ? (
              "Đang tìm kiếm..."
            ) : (
              <>
                Tìm thấy {totalResults} kết quả
                {searchQuery ? ` cho "${searchQuery}"` : ""}
              </>
            )}
          </h1>
        </div>

        {/* Results Grid */}
        {loading && nextCursor === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-[#ff6d0b]" />
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-lg font-medium mb-2">
              Không tìm thấy kết quả nào
            </h2>
            <p className="text-gray-500 mb-6">
              Vui lòng thử lại với các tiêu chí tìm kiếm khác
            </p>
            <Button
              className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
              onClick={() => {
                setFilters({
                  minPrice: null,
                  maxPrice: null,
                  minArea: null,
                  maxArea: null,
                  city: null,
                  district: null,
                  ward: null,
                  interiorCondition: null,
                });
                setSearchQuery("");
                navigate("/search");
                fetchSearchResults(0);
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {results.map((post) => (
                <Card
                  key={post.postId}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={
                        post.multimediaFiles[0]?.fileId
                          ? `/placeholder.svg?height=300&width=400&text=Phòng+${post.postId}`
                          : "/placeholder.svg?height=300&width=400"
                      }
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
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
                          {formatPrice(post.price)}
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-[200px]">
                          {post.district}, {post.city}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span>{post.acreage} m²</span>
                      <span>•</span>
                      <span>
                        {post.interiorCondition === "Full"
                          ? "Đầy đủ nội thất"
                          : "Không nội thất"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(post.createdAt)}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mb-8">
                <Button
                  variant="outline"
                  className="border-[#ff6d0b] text-[#ff6d0b] hover:bg-[#ff6d0b]/10"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Đang tải...
                    </>
                  ) : (
                    <>
                      Xem thêm
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={nextCursor <= 1}
                  onClick={() => {
                    if (nextCursor > 1) {
                      fetchSearchResults(0);
                    }
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant={nextCursor === 1 ? "default" : "outline"}
                  className={
                    nextCursor === 1 ? "bg-[#ff6d0b] hover:bg-[#ff6d0b]/90" : ""
                  }
                  size="sm"
                  onClick={() => fetchSearchResults(0)}
                >
                  1
                </Button>
                <Button
                  variant={nextCursor === 2 ? "default" : "outline"}
                  className={
                    nextCursor === 2 ? "bg-[#ff6d0b] hover:bg-[#ff6d0b]/90" : ""
                  }
                  size="sm"
                  onClick={() => fetchSearchResults(1)}
                >
                  2
                </Button>
                <Button
                  variant={nextCursor === 3 ? "default" : "outline"}
                  className={
                    nextCursor === 3 ? "bg-[#ff6d0b] hover:bg-[#ff6d0b]/90" : ""
                  }
                  size="sm"
                  onClick={() => fetchSearchResults(2)}
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={!hasMore}
                  onClick={() => {
                    if (hasMore) {
                      fetchSearchResults(nextCursor);
                    }
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

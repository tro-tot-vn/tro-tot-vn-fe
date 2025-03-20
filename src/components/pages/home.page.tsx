import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  SearchIcon,
  MapPin,
  Heart,
  Building2,
  HomeIcon,
  Building,
  ChevronRight,
  Bed,
} from "lucide-react";
import { Link } from "react-router";

// Sample categories
const categories = [
  { id: 1, name: "Phòng trọ", icon: <Bed className="h-5 w-5" />, count: 3250 },
  {
    id: 2,
    name: "Nhà nguyên căn",
    icon: <HomeIcon className="h-5 w-5" />,
    count: 854,
  },
  {
    id: 3,
    name: "Chung cư mini",
    icon: <Building className="h-5 w-5" />,
    count: 1089,
  },
  {
    id: 4,
    name: "Ở ghép",
    icon: <Building2 className="h-5 w-5" />,
    count: 567,
  },
  {
    id: 5,
    name: "Homestay",
    icon: <Building2 className="h-5 w-5" />,
    count: 396,
  },
];

// Sample locations
const popularLocations = [
  { id: 1, name: "TP. Hồ Chí Minh", count: 5230 },
  { id: 2, name: "Hà Nội", count: 4580 },
  { id: 3, name: "Đà Nẵng", count: 1240 },
  { id: 4, name: "Cần Thơ", count: 780 },
  { id: 5, name: "Bình Dương", count: 1150 },
  { id: 6, name: "Đồng Nai", count: 860 },
];

// Sample featured listings
const featuredListings = [
  {
    id: 1,
    title: "Phòng trọ cao cấp đầy đủ nội thất gần ĐH Bách Khoa",
    price: "3.5 triệu/tháng",
    location: "Quận Bình Thạnh, TP.HCM",
    area: "25 m²",
    amenities: ["Máy lạnh", "WC riêng", "Wifi"],
    image: "/placeholder.svg?height=400&width=600",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    author: "Nguyễn Văn A",
    postedTime: "2 giờ trước",
    isFeatured: true,
    isVerified: true,
  },
  {
    id: 2,
    title: "Phòng trọ mới xây, sạch sẽ, an ninh gần chợ Bến Thành",
    price: "2.8 triệu/tháng",
    location: "Quận 1, TP.HCM",
    area: "20 m²",
    amenities: ["WC riêng", "Wifi", "Tự do"],
    image: "/placeholder.svg?height=400&width=600",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    author: "Trần Thị B",
    postedTime: "1 ngày trước",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Nhà nguyên căn cho thuê khu vực Thảo Điền, 2 phòng ngủ",
    price: "8 triệu/tháng",
    location: "Quận 2, TP.HCM",
    area: "60 m²",
    amenities: ["2 phòng ngủ", "Máy lạnh", "Nội thất"],
    image: "/placeholder.svg?height=400&width=600",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    author: "Lê Văn C",
    postedTime: "3 ngày trước",
    isFeatured: true,
  },
  {
    id: 4,
    title: "Phòng trọ sinh viên giá rẻ gần ĐH Kinh Tế",
    price: "1.8 triệu/tháng",
    location: "Quận 10, TP.HCM",
    area: "16 m²",
    amenities: ["WC chung", "Wifi", "Giờ giấc tự do"],
    image: "/placeholder.svg?height=400&width=600",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    author: "Phạm Thị D",
    postedTime: "5 ngày trước",
    isFeatured: true,
    isVerified: true,
  },
];

// Sample new listings
const newListings = [
  {
    id: 5,
    title: "Phòng trọ cao cấp full nội thất gần Đại học Văn Lang",
    price: "3.2 triệu/tháng",
    location: "Quận Bình Thạnh, TP.HCM",
    area: "22 m²",
    amenities: ["Máy lạnh", "WC riêng", "Wifi"],
    image: "/placeholder.svg?height=400&width=600",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    author: "Hoàng Văn E",
    postedTime: "5 giờ trước",
  },
  {
    id: 6,
    title: "Phòng trọ mới xây có gác lửng gần chợ Tân Định",
    price: "2.5 triệu/tháng",
    location: "Quận 1, TP.HCM",
    area: "18 m²",
    amenities: ["Gác lửng", "WC riêng", "Wifi"],
    image: "/placeholder.svg?height=400&width=600",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    author: "Võ Thị F",
    postedTime: "8 giờ trước",
    isVerified: true,
  },
  {
    id: 7,
    title: "Chung cư mini 1PN đầy đủ nội thất cao cấp",
    price: "5 triệu/tháng",
    location: "Quận 7, TP.HCM",
    area: "35 m²",
    amenities: ["1 phòng ngủ", "Máy lạnh", "Nội thất"],
    image: "/placeholder.svg?height=400&width=600",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    author: "Ngô Văn G",
    postedTime: "1 ngày trước",
  },
  {
    id: 8,
    title: "Phòng trọ sinh viên giá rẻ gần ĐH Hoa Sen",
    price: "1.6 triệu/tháng",
    location: "Quận 1, TP.HCM",
    area: "15 m²",
    amenities: ["WC chung", "Wifi", "Giờ giấc tự do"],
    image: "/placeholder.svg?height=400&width=600",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    author: "Dương Thị H",
    postedTime: "1 ngày trước",
    isVerified: true,
  },
];

export default function HomePage() {
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
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/listings/rent/ho-chi-minh"
                      className="text-xs rounded-full px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      TP. Hồ Chí Minh
                    </Link>
                    <Link
                      to="/listings/rent/ha-noi"
                      className="text-xs rounded-full px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      Hà Nội
                    </Link>
                    <Link
                      to="/listings/rent/da-nang"
                      className="text-xs rounded-full px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      Đà Nẵng
                    </Link>
                    <Link
                      to="/listings/rent/can-tho"
                      className="text-xs rounded-full px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      Cần Thơ
                    </Link>
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

        {/* Categories Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Danh mục phòng trọ</h2>
              <Link
                to="/categories"
                className="text-[#ff6d0b] hover:underline text-sm flex items-center"
              >
                Xem tất cả <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link key={category.id} to={`/category/${category.id}`}>
                  <Card className="hover:border-[#ff6d0b]/50 transition-colors">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-[#ff6d0b]/10 flex items-center justify-center text-[#ff6d0b] mb-3">
                        {category.icon}
                      </div>
                      <h3 className="font-medium mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-500">
                        {category.count.toLocaleString()} tin đăng
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Phòng trọ nổi bật</h2>
              <Link
                to="/featured"
                className="text-[#ff6d0b] hover:underline text-sm flex items-center"
              >
                Xem tất cả <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {listing.isFeatured && (
                        <Badge className="bg-[#ff6d0b] hover:bg-[#ff6d0b]">
                          Nổi bật
                        </Badge>
                      )}
                      {listing.isVerified && (
                        <Badge className="bg-blue-500 hover:bg-blue-500">
                          Đã xác thực
                        </Badge>
                      )}
                    </div>
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[#ff6d0b]">
                        {listing.price}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-[150px]">
                          {listing.location}
                        </span>
                      </div>
                    </div>
                    <Link to={`/listing/${listing.id}`}>
                      <h3 className="font-medium line-clamp-2 mb-2 hover:text-[#ff6d0b]">
                        {listing.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span>{listing.area}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {listing.amenities?.map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <img
                          src={listing.avatarUrl || "/placeholder.svg"}
                          alt={listing.author}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-xs">{listing.author}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {listing.postedTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <img
              src="/placeholder.svg?height=200&width=1200"
              alt="Banner Quảng Cáo"
              width={1200}
              height={200}
              className="w-full rounded-lg h-auto object-cover"
            />
          </div>
        </section>

        {/* New Listings */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Phòng trọ mới đăng</h2>
              <Link
                to="/newest"
                className="text-[#ff6d0b] hover:underline text-sm flex items-center"
              >
                Xem tất cả <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {listing.isVerified && (
                        <Badge className="bg-blue-500 hover:bg-blue-500">
                          Đã xác thực
                        </Badge>
                      )}
                    </div>
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[#ff6d0b]">
                        {listing.price}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-[150px]">
                          {listing.location}
                        </span>
                      </div>
                    </div>
                    <Link to={`/listing/${listing.id}`}>
                      <h3 className="font-medium line-clamp-2 mb-2 hover:text-[#ff6d0b]">
                        {listing.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span>{listing.area}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {listing.amenities?.map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <img
                          src={listing.avatarUrl || "/placeholder.svg"}
                          alt={listing.author}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-xs">{listing.author}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {listing.postedTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                Xem tất cả <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularLocations.map((location) => (
                <Link key={location.id} to={`/location/${location.id}`}>
                  <Card className="hover:border-[#ff6d0b]/50 transition-colors h-full">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <h3 className="font-medium mb-1">{location.name}</h3>
                      <p className="text-sm text-gray-500">
                        {location.count.toLocaleString()} phòng trọ
                      </p>
                    </CardContent>
                  </Card>
                </Link>
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
            >
              Đăng tin ngay
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

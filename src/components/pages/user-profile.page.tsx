"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Star,
  StarHalf,
  CheckCircle,
} from "lucide-react";
import { PostListing } from "../elements/post-listing.element";
import { Label } from "@radix-ui/react-dropdown-menu";

// Mock data for active listings
const activeListings = [
  {
    id: 1,
    title: "Siêu phẩm giá rẻ 1682m2 ngay tại mặt tiền đường QL55 Xuyên Mộc",
    price: "3.500.000.000 đ",
    location: "Bà Rịa - Vũng Tàu",
    timeAgo: "22 phút trước",
    image: "/placeholder.svg?height=200&width=300",
    isPartner: true,
  },
  {
    id: 2,
    title: "Ngân hàng thanh lý 297m2 tại Thị xã Trảng Bàng giá 771 triệu",
    price: "771.000.000 đ",
    location: "Tây Ninh",
    timeAgo: "2 tuần trước",
    image: "/placeholder.svg?height=200&width=300",
    isPartner: true,
  },
  {
    id: 3,
    title:
      "Ngân hàng thanh lý 617,2m2 đường Nguyễn Thị Định, P Vĩnh Hiệp GIÁ TỐT",
    price: "3.225.000.000 đ",
    location: "Kiên Giang",
    timeAgo: "2 tuần trước",
    image: "/placeholder.svg?height=200&width=300",
    isPartner: true,
  },
  {
    id: 4,
    title: "Ngân hàng thanh lý lô đất 16,41m mặt tiền đường ô tô tại Bà Rịa",
    price: "1.850.000.000 đ",
    location: "Bà Rịa - Vũng Tàu",
    timeAgo: "2 tuần trước",
    image: "/placeholder.svg?height=200&width=300",
    isPartner: true,
  },
  {
    id: 5,
    title: "Ngân hàng VIB phát mại lô đất 638m2 đường nhựa 8m giá đầu tư",
    price: "2.100.000.000 đ",
    location: "Kiên Giang",
    timeAgo: "2 tuần trước",
    image: "/placeholder.svg?height=200&width=300",
    isPartner: true,
  },
  {
    id: 6,
    title:
      "Ngân hàng phát mại 2 lô liề kề ngang 10m tại Làng Đại giá chỉ 1,2 tỷ",
    price: "1.200.000.000 đ",
    location: "Bình Dương",
    timeAgo: "3 tuần trước",
    image: "/placeholder.svg?height=200&width=300",
    isPartner: true,
  },
  {
    id: 7,
    title: "Ngân hàng phát mại 533m2, có nhà GIÁ ĐẦU TƯ",
    price: "2.465.000.000 đ",
    location: "Bà Rịa - Vũng Tàu",
    timeAgo: "2 tuần trước",
    image: "/placeholder.svg?height=200&width=300",
    isPartner: true,
  },
  {
    id: 8,
    title:
      "VIB phát mại nhà 3 tầng mặt tiền Mai Văn Bồ cách biển 250m (ms Dương)",
    price: "4.801.000.000 đ",
    location: "Kiên Giang",
    timeAgo: "2 tuần trước",
    image: "/placeholder.svg?height=200&width=300",
    isPartner: true,
  },
  {
    id: 9,
    title:
      "Bán lô đất 6m mặt tiền đường Phan Bội Châu, TT. Phước Vĩnh, Phú Giáo",
    price: "1.423.000.000 đ",
    location: "Bình Dương",
    timeAgo: "3 tuần trước",
    image: "/placeholder.svg?height=200&width=300",
    isPartner: true,
  },
];

export default function UserProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const params = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gray-200 relative">
            <img
              src="/placeholder.svg?height=128&width=1200"
              alt="Banner"
              width={1200}
              height={128}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/80 hover:bg-white"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-4 md:p-6 pt-0 relative">
            {/* Avatar */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end -mt-12 mb-4">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden">
                  <img
                    src="/placeholder.svg?height=96&width=96"
                    alt="Ngân hàng Thanh lý tài sản"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold">
                  Ngân hàng Thanh lý tài sản
                </h1>
                <div className="flex items-center gap-1 mt-1">
                  <span className="font-bold">4.7</span>
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <StarHalf className="h-4 w-4 fill-current" />
                  </div>
                  <span className="text-sm text-gray-500">(10 đánh giá)</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  className={
                    isFollowing
                      ? "border-[#ff6d0b] text-[#ff6d0b]"
                      : "bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
                  }
                  onClick={handleFollow}
                >
                  {isFollowing ? "Đang theo dõi" : "Theo dõi"}
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Nhắn tin
                </Button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">
                      Người theo dõi: <strong>622</strong>
                    </span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">
                      Đang theo dõi: <strong>0</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Phản hồi chat: <strong>Thỉnh thoảng</strong> (Trong 15 giờ)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Đã tham gia: <strong>2 năm 4 tháng</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Đã xác thực:
                    <div className="flex flex-row gap-2 items-center">
                      <img src="/facebook-logo.svg" width="24" height="24" />
                      <img
                        src="/google-logo.svg"
                        alt="Google"
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                    </div>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Địa chỉ: <strong>Quận 3, Tp Hồ Chí Minh</strong>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Giới thiệu</h3>
                <p className="text-sm text-gray-600">
                  Chuyên thanh lý các tài sản từ ngân hàng với giá ưu đãi. Chúng
                  tôi cung cấp các bất động sản đã được thẩm định pháp lý đầy
                  đủ, giúp khách hàng an tâm đầu tư.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-gray-50">
                    Bất động sản
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50">
                    Thanh lý tài sản
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50">
                    Đất nền
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50">
                    Nhà phố
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Listings */}
        <div className="w-full">
          <div className="mt-0">
            <div>
                <Label className="text-xl font-semibold mb-4">Tin gần đây</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeListings.map((listing) => (
                <PostListing key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" className="text-[#ff6d0b]">
                Xem thêm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

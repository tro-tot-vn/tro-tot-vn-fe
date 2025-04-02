import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Info, MoreVertical, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";

// Mẫu dữ liệu đánh giá
const ratingStats = {
  average: 4.2,
  total: 240,
  distribution: [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 7 },
  ],
};

// Mẫu dữ liệu đánh giá chi tiết
const reviewsData: {
  id: number;
  author: { name: string; avatar: string };
  rating: number;
  date: string;
  content: string;
  helpful: number;
  isHelpful: boolean | null;
}[] = [
  {
    id: 1,
    author: {
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "16/03/2025",
    content:
      "Chủ nhà rất thân thiện và nhiệt tình. Căn nhà đúng như mô tả, sạch sẽ, đầy đủ tiện nghi. Vị trí thuận tiện, gần chợ và trường học. Tôi rất hài lòng với trải nghiệm này và chắc chắn sẽ quay lại nếu có cơ hội.",
    helpful: 37,
    isHelpful: null,
  },
  {
    id: 2,
    author: {
      name: "Trần Thị B",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    date: "10/03/2025",
    content:
      "Nhà đẹp, sạch sẽ, đầy đủ tiện nghi. Chỉ có điều hơi ồn vào buổi sáng do gần đường lớn. Chủ nhà nhiệt tình, dễ thương.",
    helpful: 15,
    isHelpful: null,
  },
  {
    id: 3,
    author: {
      name: "Lê Văn C",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 3,
    date: "05/03/2025",
    content:
      "Nhà ở vị trí thuận tiện, gần trung tâm. Tuy nhiên, một số thiết bị trong nhà đã cũ và không hoạt động tốt. Chủ nhà có phản hồi nhanh khi tôi báo sự cố.",
    helpful: 8,
    isHelpful: null,
  },
];

export function RatingsReviews() {
  const [reviews] = useState(reviewsData);

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Đánh giá và nhận xét</h2>
        <div className="flex items-center text-gray-500 text-sm">
          <span>Đánh giá đã được xác minh</span>
          <Info className="h-4 w-4 ml-1" />
        </div>
      </div>

      <div className="flex flex-col gap-8 mb-8">
        {/* Tổng quan đánh giá */}
        <div className="">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold mb-2">{ratingStats.average}</div>
            <div className="flex mb-1">
              {renderStars(Math.round(ratingStats.average))}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              {ratingStats.total}K đánh giá
            </div>

            {/* Biểu đồ phân phối sao */}
            <div className="w-full space-y-2">
              {ratingStats.distribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-sm w-3">{item.stars}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#ff6d0b]"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Danh sách đánh giá */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={review.author.avatar}
                        alt={review.author.name}
                      />
                      <AvatarFallback>
                        {review.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{review.author.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Tùy chọn</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Báo cáo đánh giá</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex my-2">{renderStars(review.rating)}</div>

                <p className="text-gray-700 my-3">{review.content}</p>
              </Card>
            ))}

            <div className="text-center">
              <Link to="/reviews">
                <Button variant="outline" className="mt-4">
                  Xem tất cả đánh giá
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

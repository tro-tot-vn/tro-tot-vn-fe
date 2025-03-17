import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoPostElement from "../elements/no-post.element";
import { StatsCard } from "../elements/stats-card.element";
import { Eye, FileText, MessageSquare } from "lucide-react";

export default function MyPostPage() {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 m-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatsCard
            title="Tổng số tin đăng"
            value="5"
            description="Trong tháng này"
            icon={FileText}
            trend="up"
            trendValue="20%"
          />
          <StatsCard
            title="Lượt xem"
            value="128"
            description="7 ngày qua"
            icon={Eye}
            trend="up"
            trendValue="15%"
          />
          <StatsCard
            title="Tin nhắn"
            value="24"
            description="Chưa đọc: 3"
            icon={MessageSquare}
            trend="neutral"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 flex-1">
        <div className="flex items-center justify-between mb-6"></div>

        <Tabs defaultValue="current">
          <TabsList className="w-full justify-start border-b h-auto p-0 bg-transparent">
            <TabsTrigger
              value="current"
              className=" font-bold text-[black] rounded-none data-[state=active]:text-[#ff6d0b] border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              ĐANG HIỆN THỊ
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="rounded-none data-[state=active]:text-[#ff6d0b]
               border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] 
               data-[state=active]:bg-transparent font-bold text-[black]"
            >
              HẾT HẠN
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className=" font-bold text-[black] rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent data-[state=active]:text-[#ff6d0b] data-[state=active]:font-semibold"
            >
              BỊ TỪ CHỐI
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="font-bold text-[black] rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              CHỜ DUYỆT
            </TabsTrigger>
            <TabsTrigger
              value="hidden"
              className="font-bold text-[black]rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              ĐÃ ẨN
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-8">
            <NoPostElement />
          </TabsContent>
          <TabsContent value="expired" className="mt-8">
            <NoPostElement />
          </TabsContent>
          <TabsContent value="rejected" className="mt-8">
            <NoPostElement />
          </TabsContent>
          <TabsContent value="pending" className="mt-8">
            <NoPostElement />
          </TabsContent>
          <TabsContent value="hidden" className="mt-8">
            <NoPostElement />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
    </div>
  );
}

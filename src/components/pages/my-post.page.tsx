import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoPostElement from "../elements/no-post.element";

export default function MyPostPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}

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

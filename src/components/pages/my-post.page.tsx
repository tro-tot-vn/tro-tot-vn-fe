import { useEffect, useState, useRef, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "../elements/stats-card.element";
import { Eye, FileText, LoaderCircle, MessageSquare } from "lucide-react";
import { ListMyPendingPost } from "../elements/list-pending.element";
import { ListApprovedPost } from "../elements/list-approved.element";
import { ListRejectPost } from "../elements/list-reject.element";
import { ListSuspendedPost } from "../elements/list-suspended.element";
import { PostService } from "@/services/post.service";
import { PostStatus } from "@/services/types/value-object.enum";
import { GetPostByStatusResponse } from "@/services/types/get-list-post-by-status-reponse";

const postService = new PostService();

export default function MyPostPage() {
  // Khởi tạo tab mặc định
  const [currentTab, setCurrentTab] = useState(PostStatus.APPROVED.valueOf());
  // Dữ liệu của mỗi tab được lưu trong một Map
  const [postData, setPostData] = useState<
    Map<string, GetPostByStatusResponse>
  >(new Map<string, GetPostByStatusResponse>());
  // Ref cho loader (phần animation)
  const loaderRef = useRef<HTMLDivElement>(null);
  // Ref để tránh gọi load nhiều lần liên tiếp lúc đang load dữ liệu
  const loadingRef = useRef(false);

  const loadMoreItems = useCallback(() => {
    const savedTab = currentTab;
    const response = postData.get(savedTab);
    // Nếu đã load xong (hasMore false) thì không thực hiện gọi tiếp
    if (response && !response.hasMore) {
      console.log("Không còn dữ liệu load thêm cho tab:", savedTab);
      return;
    }
    // Nếu đang load thì không gọi thêm lần nữa
    if (loadingRef.current) return;
    loadingRef.current = true;

    // Lấy nextCursor: trong lần load đầu tiên, nếu response không tồn tại, nextCursor sẽ undefined
    const nextCursor = response ? response.nextCursor : null;

    postService
      .getListPost(savedTab, nextCursor ?? undefined)
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          setPostData((prevMap) => {
            const newMap = new Map(prevMap);
            const prevResponse = newMap.get(savedTab);
            if (res.data.data) {
              if (prevResponse) {
                newMap.set(savedTab, {
                  dataPag: prevResponse.dataPag.concat(res.data.data.dataPag),
                  nextCursor: res.data.data.nextCursor,
                  hasMore: res.data.data.hasMore,
                });
              } else {
                newMap.set(savedTab, res.data.data);
              }
            }
            return newMap;
          });
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        loadingRef.current = false;
      });
  }, [currentTab, postData]);

  // Khi tab thay đổi, nếu dữ liệu chưa được load cho tab đó thì gọi loadMoreItems
  useEffect(() => {
    if (!postData.get(currentTab)) {
      loadMoreItems();
    }
  }, [currentTab, postData, loadMoreItems]);

  // Intersection Observer để kiểm tra khi phần Loader xuất hiện
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Loader hiển thị ở tab:", currentTab);
            loadMoreItems();
          }
        });
      },
      { threshold: 0.1 }
    );
    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }
    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [loadMoreItems, currentTab]);

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
        <Tabs
          defaultValue={currentTab}
          onValueChange={(value: string) => setCurrentTab(value)}
        >
          <TabsList className="w-full justify-start border-b h-auto p-0 bg-transparent">
            <TabsTrigger
              value={PostStatus.APPROVED}
              className="font-bold text-black rounded-none data-[state=active]:text-[#ff6d0b] border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              ĐANG HIỆN THỊ
            </TabsTrigger>
            <TabsTrigger
              value={PostStatus.REJECTED}
              className="font-bold text-black rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent data-[state=active]:text-[#ff6d0b] data-[state=active]:font-semibold"
            >
              BỊ TỪ CHỐI
            </TabsTrigger>
            <TabsTrigger
              value={PostStatus.PENDING}
              className="font-bold text-black rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              CHỜ DUYỆT
            </TabsTrigger>
            <TabsTrigger
              value={PostStatus.HIDDEN}
              className="font-bold text-black rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              ĐÃ ẨN
            </TabsTrigger>
          </TabsList>

          <TabsContent value={PostStatus.APPROVED} className="mt-8">
            {postData.get(PostStatus.APPROVED) ? (
              <ListApprovedPost
                listPostRes={postData.get(PostStatus.APPROVED)?.dataPag ?? []}
              />
            ) : null}
          </TabsContent>
          <TabsContent value={PostStatus.REJECTED} className="mt-8">
            {postData.get(PostStatus.REJECTED) ? (
              <ListRejectPost
                listPostRes={postData.get(PostStatus.REJECTED)?.dataPag ?? []}
              />
            ) : null}
          </TabsContent>
          <TabsContent value={PostStatus.PENDING} className="mt-8">
            {postData.get(PostStatus.PENDING) ? (
              <ListMyPendingPost
                listPostRes={postData.get(PostStatus.PENDING)?.dataPag ?? []}
              />
            ) : null}
          </TabsContent>
          <TabsContent value={PostStatus.HIDDEN} className="mt-8">
            {postData.get(PostStatus.HIDDEN) ? (
              <ListSuspendedPost
                listPostRes={postData.get(PostStatus.HIDDEN)?.dataPag ?? []}
              />
            ) : null}
          </TabsContent>
        </Tabs>
        {/* Loader chỉ hiển thị khi có thêm dữ liệu để load */}
        {postData.get(currentTab)?.hasMore && (
          <div
            ref={loaderRef}
            className="mt-4 p-4 flex items-center justify-center flex-col text-gray-500 animate-pulse"
          >
            <LoaderCircle className="animate-spin" />
            Loading more items...
          </div>
        )}
      </div>
    </div>
  );
}

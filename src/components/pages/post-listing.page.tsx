import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Type definitions
type Post = {
  id: number;
  title: string;
  price: string;
  pricePerM2: string;
  area: string;
  bedrooms: number;
  type: string;
  location: string;
  postedTime: string;
  isSaved?: boolean;
  images: string[];
  author: {
    name: string;
    avatar: string;
    postCount: number;
  };
};

// Mock API function to fetch posts
const fetchPosts = (page: number, limit: number): Promise<Post[]> => {
  // This would be replaced with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPosts: Post[] = Array.from({ length: limit }, (_, i) => ({
        id: page * limit + i + 1,
        title:
          i === 0 && page === 0
            ? "Nhà Ngay Khu Phần Mềm Quang Trung - 32 m2 1Trệt - 1 Lầu Giá 595Triệu"
            : `Căn hộ ${page * limit + i + 1} - ${
                Math.floor(Math.random() * 3) + 1
              }PN Quận ${Math.floor(Math.random() * 12) + 1}`,
        price:
          i === 0 && page === 0
            ? "595 triệu"
            : `${(Math.random() * 10 + 1).toFixed(1)} tỷ`,
        pricePerM2:
          i === 0 && page === 0
            ? "37 tr/m²"
            : `${Math.floor(Math.random() * 50) + 30} tr/m²`,
        area:
          i === 0 && page === 0
            ? "16 m²"
            : `${Math.floor(Math.random() * 100) + 30} m²`,
        bedrooms: i === 0 && page === 0 ? 2 : Math.floor(Math.random() * 4) + 1,
        type:
          i % 3 === 0
            ? "Nhà mặt phố, mặt tiền"
            : i % 3 === 1
            ? "Căn hộ chung cư"
            : "Nhà phố",
        location: "Tp Hồ Chí Minh",
        postedTime:
          i === 0 && page === 0
            ? "18 giờ trước"
            : `${Math.floor(Math.random() * 7) + 1} ngày trước`,
        isFeatured: Math.random() > 0.8,
        isSaved: Math.random() > 0.7,
        images: Array(Math.floor(Math.random() * 5) + 2).fill(
          "/placeholder.svg?height=200&width=300"
        ),
        author: {
          name:
            i === 0 && page === 0
              ? "Nguyễn Minh Quốc"
              : `Người đăng ${page * limit + i + 1}`,
          avatar: "/placeholder.svg?height=40&width=40",
          postCount: Math.floor(Math.random() * 10) + 1,
        },
      }));
      resolve(newPosts);
    }, 800); // Simulate network delay
  });
};

interface PostListingsProps {
  initialPosts?: Post[];
  className?: string;
  onSaveToggle?: (postId: number, isSaved: boolean) => void;
  onPostClick?: (postId: number) => void;
  onChatClick?: (authorId: string) => void;
}

export function PostListings({
  initialPosts = [],
  className = "",
  onPostClick,
}: PostListingsProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMorePosts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newPosts = await fetchPosts(page, 5);
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load initial posts if none provided
    if (posts.length === 0) {
      loadMorePosts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isLoading]);

  const handlePostClick = (id: number) => {
    if (onPostClick) {
      onPostClick(id);
    }
  };

  return (
    <div className={`${className} flex-1`}>
      <div className="flex gap-2 flex-col w-[50%] mx-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            onClick={() => handlePostClick(post.id)}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-[240px] flex-shrink-0">
                <img
                  src={post.images[0] || "/placeholder.svg"}
                  alt={post.title}
                  width={240}
                  height={180}
                  className="w-full h-[180px] object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  <span>{post.images.length}</span>
                </div>
              </div>

              <div className="p-4 flex-1">
                <h3 className="font-bold line-clamp-2">{post.title}</h3>

                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-base text-[#ff6d0b]">
                    {post.price}
                  </span>
                  <div className="flex items-center  text-gray-500">
                    <span>•</span>
                    <span className="mx-2 text-xs">{post.pricePerM2}</span>
                    <span>•</span>
                    <span className="mx-2 text-xs">{post.area}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <span>{post.bedrooms} PN</span>
                  <span className="mx-1">•</span>
                  <span>{post.type}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <span>{post.location}</span>
                  <span className="mx-1">•</span>
                  <span>{post.postedTime}</span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-lg font-semibold border border-gray-200">
                      {post.author.avatar ? (
                        <img
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">
                          {post.author.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm ">{post.author.name}</p>
                      <p className="text-xs text-gray-500">
                        {post.author.postCount} tin đăng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden p-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="h-[180px] sm:w-[240px] rounded-md flex-shrink-0" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex justify-between pt-4">
                      <div className="flex gap-2">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-9 w-20 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Observer target for infinite loading */}
        <div ref={observerTarget} className="h-4" />

        {/* End of results message */}
        {!hasMore && posts.length > 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">
            Bạn đã xem hết tất cả tin đăng
          </div>
        )}
      </div>
    </div>
  );
}

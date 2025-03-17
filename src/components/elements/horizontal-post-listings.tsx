"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, Heart, ImageIcon } from "lucide-react"
import { useRef, useState } from "react"

type Post = {
  id: number
  title: string
  price: string
  area: string
  bedrooms: number
  location: string
  postedTime: string
  isFeatured?: boolean
  isSaved?: boolean
  images: string[]
}

interface HorizontalPostListingsProps {
  title?: string
  viewAllLink?: string
  posts: Post[]
  isLoading?: boolean
  onPostClick?: (postId: number) => void
  onSaveToggle?: (postId: number, isSaved: boolean) => void
}

export function HorizontalPostListings({
  title = "Tin đăng gần đây",
  viewAllLink,
  posts = [],
  isLoading = false,
  onPostClick,
  onSaveToggle,
}: HorizontalPostListingsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const { clientWidth } = scrollContainerRef.current
    const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2

    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  const toggleSave = (id: number, currentSaved: boolean | undefined) => {
    if (onSaveToggle) {
      onSaveToggle(id, !currentSaved)
    }
  }

  const handlePostClick = (id: number) => {
    if (onPostClick) {
      onPostClick(id)
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {viewAllLink && (
          <Button variant="link" className="text-[#ff6d0b]" asChild>
            <a href={viewAllLink}>Xem tất cả</a>
          </Button>
        )}
      </div>

      {/* Navigation Arrows */}
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-md border-gray-200 h-10 w-10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}

      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-md border-gray-200 h-10 w-10"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-4 px-4"
        onScroll={handleScroll}
      >
        {isLoading
          ? // Loading skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[280px]">
                <Card className="overflow-hidden">
                  <Skeleton className="h-[180px] w-full" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </Card>
              </div>
            ))
          : // Actual posts
            posts.map((post) => (
              <div key={post.id} className="flex-shrink-0 w-[280px]">
                <Card
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="relative">
                    <img
                      src={post.images[0] || "/placeholder.svg"}
                      alt={post.title}
                      width={280}
                      height={180}
                      className="h-[180px] w-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      <span>{post.images.length}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm ${
                        post.isSaved ? "text-red-500" : "text-gray-500"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSave(post.id, post.isSaved)
                      }}
                    >
                      <Heart className="h-5 w-5" fill={post.isSaved ? "currentColor" : "none"} />
                    </Button>
                    {post.isFeatured && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <span className="text-white text-xs font-medium">Tin ưu tiên</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-base mb-2 line-clamp-2 h-[50px]">{post.title}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-bold text-[#ff6d0b]">{post.price}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-sm">{post.area}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>{post.bedrooms} PN</span>
                      <span>•</span>
                      <span>{post.location}</span>
                      <span>•</span>
                      <span>{post.postedTime}</span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
      </div>

      {/* <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style> */}
    </div>
  )
}


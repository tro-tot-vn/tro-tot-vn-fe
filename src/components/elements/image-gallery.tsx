import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, MoreVertical, Play } from "lucide-react";
import { MultimediaFileDetailPost } from "@/services/types/get-detail-post.response";
import { FileType } from "@/services/types/get-list-post-by-status-reponse";
import { useLightbox } from "@/hooks/use-lightbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useAuth from "@/hooks/use-auth";
import { getFileUrl as getCurrentFileUrl } from "@/config/env";

export function ImageGallery({
  data,
  addToSavedPosts,
}: {
  data: MultimediaFileDetailPost[];
  addToSavedPosts: () => void;
}) {
  const auth = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openLightbox, LightboxComponent } = useLightbox();
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const goToItem = (index: number) => {
    setCurrentIndex(index);
  };

  // Tự động cuộn thumbnail đang active vào vùng nhìn thấy
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const thumbnailWidth = container.scrollWidth / data.length;
      const scrollPosition =
        thumbnailWidth * currentIndex -
        container.clientWidth / 2 +
        thumbnailWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }

    // Reset video playing state when changing items
    setIsPlaying(false);
  }, [currentIndex, data.length]);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Xác định xem item hiện tại là hình ảnh hay video
  const isCurrentItemVideo =
    data[currentIndex]?.file.fileType === FileType.VIDEO;

  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Main Content (Image or Video) */}
      <LightboxComponent />
      <div className="relative aspect-[2/1] bg-gray-100">
        {isCurrentItemVideo ? (
          // Video Player
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={getCurrentFileUrl(data[currentIndex].fileId)}
              className="w-full h-full object-contain"
              controls={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onClick={() => openLightbox(data[currentIndex])}
            />
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30"
                onClick={toggleVideoPlay}
              >
                <div className="bg-white/80 rounded-full p-4">
                  <Play className="h-8 w-8 text-[#ff6d0b] fill-[#ff6d0b]" />
                </div>
              </div>
            )}
          </div>
        ) : (
          // Image
          <img
            src={
              getCurrentFileUrl(data[currentIndex].fileId) || "/placeholder.svg"
            }
            alt={`Hình ảnh ${currentIndex + 1}`}
            className="w-full h-full object-contain"
            onClick={() => openLightbox(data[currentIndex])}
          />
        )}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
          aria-label="Trước"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
          aria-label="Tiếp theo"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Action Buttons */}
        {auth.isAuthenticated ? (
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="bg-white/80 hover:bg-white text-gray-700 rounded-full h-10 w-10 flex flex-col items-center justify-center cursor-pointer">
                  <MoreVertical className="h-5 w-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    addToSavedPosts();
                  }}
                >
                  Thêm tin vào danh sách đã lưu
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <></>
        )}
        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-10">
          {currentIndex + 1} / {data.length}
        </div>
      </div>
      {/* Thumbnails */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto mt-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 cursor-pointer p-0.5 ${
              index === currentIndex
                ? "border-2 border-[#ff6d0b]"
                : "border-2 border-transparent"
            }`}
            onClick={() => goToItem(index)}
          >
            <div className="relative w-24 h-16">
              {item.file.fileType === FileType.VIDEO ? (
                <div className="relative w-full h-full">
                  <video
                    src={getCurrentFileUrl(item.fileId)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={getCurrentFileUrl(item.fileId) || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

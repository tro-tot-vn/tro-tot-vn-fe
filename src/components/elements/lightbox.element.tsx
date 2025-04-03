import { MultimediaFileDetailPost } from "@/services/types/get-detail-post.response";
import { FileType } from "@/services/types/get-list-post-by-status-reponse";
import { useState, useRef, useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  file: MultimediaFileDetailPost | null; // Nhận một file hoặc null
}

export function Lightbox({ isOpen, onClose, file }: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset scale and video state when opening
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setIsPlaying(false);
    }
  }, [isOpen]);

  // Zoom bằng sự kiện cuộn chuột
  const handleWheel = (e: React.WheelEvent) => {
    setScale((prevScale) => {
      const newScale = e.deltaY > 0 ? prevScale - 0.1 : prevScale + 0.1;
      return Math.min(Math.max(newScale, 0.5), 3); // Giới hạn zoom từ 0.5 đến 3
    });
  };

  // Xử lý phát/tạm dừng video
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

  const isVideo = file?.file.fileType === FileType.VIDEO // Kiểm tra nếu file là video

  const getFileUrl = (fileId: number) => {
    return `http://localhost:3333/api/files/${fileId}`;
  };

  if (!isOpen || !file) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onWheel={handleWheel} // Lắng nghe sự kiện cuộn chuột
      ref={containerRef}
    >
      {/* Nút Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl z-60"
      >
        ✕
      </button>

      <div className="relative">
        {isVideo ? (
          <video
            ref={videoRef}
            src={getFileUrl(file.fileId)}
            controls
            className="max-w-full max-h-screen"
          />
        ) : (
          <img
            src={getFileUrl(file.fileId)}
            alt={"Media"}
            style={{ transform: `scale(${scale})` }}
            className="max-w-full max-h-screen transition-transform duration-200"
          />
        )}
      </div>

      {/* Điều khiển video */}
      {isVideo && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button onClick={toggleVideoPlay} className="text-white">
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  );
}
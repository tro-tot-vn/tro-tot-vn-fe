import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { GetMyRateFromPostRes } from "@/services/types/get-my-rate-from-post.response";

interface RatingDialogProps {
  myRate: GetMyRateFromPostRes | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rating: number, comment: string) => void;
}

export function RatingDialog({
  myRate,
  open,
  onOpenChange,
  onSubmit,
}: RatingDialogProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (myRate) {
      setRating(myRate.numRate);
      setComment(myRate.comment);
    }
  }, [myRate]);
  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your server
      onSubmit(rating, comment);
      // Reset form after successful submission
      setRating(0);
      setComment("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleRatingHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating);
  };

  const getRatingLabel = () => {
    const displayRating = hoveredRating || rating;

    switch (displayRating) {
      case 1:
        return "Rất không hài lòng";
      case 2:
        return "Không hài lòng";
      case 3:
        return "Bình thường";
      case 4:
        return "Hài lòng";
      case 5:
        return "Rất hài lòng";
      default:
        return "Chọn đánh giá của bạn";
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đánh giá bài đăng</DialogTitle>
          <DialogDescription>{"Chia sẻ trải nghiệm của bạn"}</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">Đánh giá của bạn</p>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 focus:outline-none transition-colors"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => handleRatingHover(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        (hoveredRating || rating) >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm font-medium text-center">
                {getRatingLabel()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Nhận xét của bạn</p>
            <Textarea
              placeholder="Chia sẻ trải nghiệm của bạn về bài đăng này..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

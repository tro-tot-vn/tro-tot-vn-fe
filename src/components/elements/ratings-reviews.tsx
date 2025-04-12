import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Info,
  MoreVertical,
  ChevronRight,
  PencilIcon,
  LoaderCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RatingDialog } from "./rate-dialog.element";
import useAuth from "@/hooks/use-auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { CustomerService } from "@/services/customer.service";
import { RateResponse } from "@/services/types/get-list-rate.response";
import { GetMyRateFromPostRes } from "@/services/types/get-my-rate-from-post.response";
import { StatsPostResponse } from "@/services/types/get-stats-post.response";
interface RatingsReviewsProps {
  postId: number;
}

const customerService = new CustomerService();

export function RatingsReviews({ postId }: RatingsReviewsProps) {
  const [rateStats, setRateStats] = useState<StatsPostResponse | null>(null);
  const [rates, setRates] = useState<RateResponse[]>([]);
  const [nextCursor, setNextCursor] = useState<Date | null>(null);
  const [isHasMore, setHasMore] = useState(true);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [myRate, setMyRate] = useState<GetMyRateFromPostRes | null>(null);

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
  const auth = useAuth();
  const nav = useNavigate();

  const loadMoreRates = async () => {
    if (isHasMore) {
      {
        setLoading(true);
        customerService.getListRate(postId, 4, nextCursor).then((res) => {
          if (res.status === 200) {
            if (res.data.data) {
              console.log("res.data.data", res.data.data);
              setRates((prevs) => {
                return [...prevs, ...(res.data.data?.dataPag || [])];
              });
              setNextCursor(res.data.data.nextCursor);
              setHasMore(res.data.data.hasMore);
              setLoading(false);
            } else {
              setLoading(false);
              toast.error("Không có đánh giá nào");
            }
          } else if (res.status === 400) {
            if (res.data.message === "POST_NOT_FOUND") {
              toast.error("tin không tồn tại");
            } else {
              toast.error("Lỗi khi tải dữ liệu đánh giá");
            }
            setLoading(false);
          }
        });
      }
    }
  };

  const loadMyRate = async () => {
    customerService.getMyRateFromPost(postId).then((res) => {
      if (res.status === 200) {
        if (res.data.data) {
          setMyRate(res.data.data);
        } else {
          toast.error("Không có đánh giá nào");
        }
      } else if (res.status === 404) {
        console.log(res.data);
        if (res.data.message === "RATE_NOT_FOUND") {
          console.log("Không có đánh giá nào");
          setMyRate(null);
        } else {
          toast.error("Lỗi khi tải dữ liệu đánh giá");
        }
      }
    });
  };

  const loadStatsPost = async () => {
    customerService
      .getRatingStats(postId)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data) {
            setRateStats(res.data.data);
          } else {
            toast.error("Không có đánh giá nào");
          }
        } else if (res.status === 404) {
          console.log(res.data);
          if (res.data.message === "POST_NOT_FOUND") {
            console.log("Không có đánh giá nào");
            setRateStats(null);
          } else {
            toast.error("Lỗi khi tải dữ liệu đánh giá");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Lỗi khi tải dữ liệu đánh giá");
      });
  };

  const addRate = async (rating: number, comment: string) => {
    customerService.addRate(rating, comment, postId).then((res) => {
      if (res.status === 200) {
        toast.success("Đánh giá thành công");
        loadMyRate();
        // setNextCursor(null);
        // setRates([]);
        // setHasMore(true);
        // loadMoreRates();
      } else {
        toast.error("Đánh giá thất bại");
      }
    });
  };

  const deleteRate = async () => {
    customerService.delMyRateOnPost(postId).then((res) => {
      if (res.status === 200) {
        toast.success("Xóa đánh giá thành công");
        loadMyRate();
      } else {
        toast.error("Xóa đánh giá thất bại");
      }
    });
  };

  useEffect(() => {
    if (postId) {
      loadMoreRates();
      if (auth.isAuthenticated) {
        loadMyRate();
      }
      loadStatsPost();
    }
    // customerService.getRatingStats(postId).then((res) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);
  return (
    <>
      <div className="flex flex-1 flex-col mt-12">
        <div className=" flex min-w-full items-center justify-center">
          {/* check owner */}
          <Button
            onClick={() => {
              if (auth.isAuthenticated) {
                setOpenDialog(true);
              } else {
                toast("Vui lòng đăng nhập để đánh giá bài đăng này", {
                  description:
                    "Đăng nhập ngay để trải nghiệm nhiều tính năng hơn",
                  action: {
                    label: "Đăng nhập",
                    onClick: () => {
                      nav("/login");
                    },
                  },
                });
              }
            }}
            variant="outline"
            className="mb-4"
          >
            <PencilIcon></PencilIcon>{" "}
            {myRate ? "Cập nhật đánh giá" : "Đánh giá bài đăng"}
          </Button>
        </div>

        {myRate ? (
          <div className="mt-3 mb-5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Đánh giá của bạn</h2>
              <div className="flex items-center text-gray-500 text-sm">
                <Info className="h-4 w-4 ml-1" />
              </div>
            </div>
            <Card key={myRate.rateId} className="p-4 gap-0">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={
                        myRate.rater.avatar
                          ? `http://localhost:3333/files/${myRate.rater.avatar}`
                          : ""
                      }
                      alt={"myRate"}
                    />
                    <AvatarFallback>
                      {myRate.rater.firstName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {myRate.rater.lastName + " " + myRate.rater.firstName}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>
                        {new Date(myRate.createdAt).toLocaleDateString()}
                      </span>
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
                    <DropdownMenuItem onClick={deleteRate}>
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex my-2">{renderStars(myRate.numRate)}</div>

              <p className="text-gray-700 my-3">{myRate.comment}</p>
            </Card>
          </div>
        ) : (
          <></>
        )}

        <div className="">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Đánh giá và nhận xét</h2>
            <div className="flex items-center text-gray-500 text-sm">
              <Info className="h-4 w-4 ml-1" />
            </div>
          </div>

          <div className="flex flex-col gap-8 mb-8">
            {/* Tổng quan đánh giá */}
            <div className="">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold mb-2">
                  {rateStats?.avgRate || 0}
                </div>
                <div className="flex mb-1">
                  {renderStars(Math.round(rateStats?.avgRate || 0))}
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  {rateStats?.countRate || 0} đánh giá
                </div>
              </div>
            </div>

            {/* Danh sách đánh giá */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                {rates.map((review) => (
                  <Card key={review.rateId} className="p-4 gap-0">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={review.rater.avatar ? review.rater.avatar : ""}
                            alt={review.rater.firstName}
                          />
                          <AvatarFallback>
                            {review.rater.firstName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">
                            {review.rater.lastName +
                              " " +
                              review.rater.firstName}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Tùy chọn</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Báo cáo đánh giá</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex my-2">
                      {renderStars(review.numRate)}
                    </div>

                    <p className="text-gray-700 my-3">{review.comment}</p>
                  </Card>
                ))}

                <div className="text-center">
                  {isLoading ? (
                    <LoaderCircle className="animate-spin"></LoaderCircle>
                  ) : isHasMore ? (
                    <Button
                      onClick={() => {
                        setLoading(true);
                        loadMoreRates();
                      }}
                      variant="outline"
                      className="mt-4"
                    >
                      Xem thêm đánh giá
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RatingDialog
        myRate={myRate}
        open={isOpenDialog}
        onOpenChange={setOpenDialog}
        onSubmit={(rating, comment) => {
          addRate(rating, comment);
        }}
      />
    </>
  );
}

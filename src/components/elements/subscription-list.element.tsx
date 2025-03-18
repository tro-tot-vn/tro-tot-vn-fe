import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, MapPin, MoreVertical, Trash, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Subscription {
  subscriptionId: number;
  customerId: number;
  ward?: string;
  district: string;
  city: string;
  createdAt: string;
}

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  onDelete: (id: number) => void;
}

export function SubscriptionList({
  subscriptions,
  onLoadMore,
  isLoading,    
  hasMore,
  onDelete,
}: SubscriptionListProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, hasMore, onLoadMore]);

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: vi,
      });
    } catch (error) {
      console.error(error);
      return "Không xác định";
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <>
      <div className="space-y-4">
        {subscriptions.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <Bell className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">Chưa có đăng ký nào</h3>
              <p className="text-gray-500 mb-4">
                Bạn chưa đăng ký nhận tin theo khu vực nào. Hãy đăng ký để nhận
                thông báo khi có tin đăng mới.
              </p>
              <Button
                onClick={() => {}}
                className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
              >
                Đăng ký ngay
              </Button>
            </div>
          </Card>
        ) : (
          subscriptions.map((subscription, index) => {
            const isLastItem = index === subscriptions.length - 1;

            return (
              <Card
                key={subscription.subscriptionId}
                className="p-4"
                ref={isLastItem ? lastItemRef : null}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#ff6d0b]/10 flex items-center justify-center text-[#ff6d0b] flex-shrink-0 mt-1">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {subscription.district}, {subscription.city}
                      </h3>
                      {subscription.ward && (
                        <p className="text-sm text-gray-500">
                          {subscription.ward}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Đăng ký {formatDate(subscription.createdAt)}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Mở menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 cursor-pointer"
                        onClick={() =>
                          handleDelete(subscription.subscriptionId)
                        }
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Xóa đăng ký
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            );
          })
        )}

        {isLoading && (
          <div className="py-4 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#ff6d0b] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-gray-500">Đang tải thêm...</p>
          </div>
        )}

        {!hasMore && subscriptions.length > 0 && (
          <div className="py-4 text-center">
            <p className="text-sm text-gray-500">Đã hiển thị tất cả đăng ký</p>
          </div>
        )}
      </div>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa đăng ký</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa đăng ký này? Hành động này không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

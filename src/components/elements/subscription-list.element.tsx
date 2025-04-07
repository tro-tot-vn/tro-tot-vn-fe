import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPin, MoreVertical, Trash, LoaderCircle } from "lucide-react";
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
import { GetSubscriptionResponse } from "@/services/types/get-subscription";

interface SubscriptionListProps {
  subscriptions: GetSubscriptionResponse[];
  isLoading: boolean;
  onDelete: (subscriptionId: number) => void;
}

export function SubscriptionList({
  subscriptions,
  onDelete,
  isLoading,
}: SubscriptionListProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

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
      {!isLoading ? (
        <>
          <div className="space-y-4">
            {subscriptions.length === 0 ? (
              <></>
            ) : (
              subscriptions.map((subscription) => {
                return (
                  <Card key={subscription.subscriptionId} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#ff6d0b]/10 flex items-center justify-center text-[#ff6d0b] flex-shrink-0 mt-1">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {subscription.district}, {subscription.city}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            Đăng ký{" "}
                            {formatDate(subscription.createdAt.toISOString())}
                          </p>
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
                            <span className="sr-only">Mở menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
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
                <AlertDialogCancel onClick={cancelDelete}>
                  Hủy
                </AlertDialogCancel>
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
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <LoaderCircle className="h-6 w-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-500">Đang tải...</span>
        </div>
      )}
    </>
  );
}

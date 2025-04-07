import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, Plus } from "lucide-react";
import { SubscriptionList } from "../elements/subscription-list.element";
import { CreateSubscriptionDialog } from "../elements/create-subscription-dialog.element";
import { GetSubscriptionResponse } from "@/services/types/get-subscription";
import { CustomerService } from "@/services/customer.service";
import { toast } from "sonner";

// Mock data for subscriptions
const customerService = new CustomerService();
export default function SubscriptionsPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState<GetSubscriptionResponse[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleAddSubscription = (data: { city: string; district: string }) => {
    customerService.addSubscription(data.city, data.district).then((res) => {
      if (res.status === 200) {
        console.log("res", res.data.data);
        setSubscriptions((prev) =>
          res.data.data
            ? [
                {
                  ...res.data.data,
                },
                ...prev,
              ]
            : prev
        );
        setDialogOpen(false);
      }
      if (res.status === 400) {
        if (res.data.message === "SUBSCRIPTION_ALREADY_EXISTS") {
          toast.error("Đăng ký đã tồn tại");
          return;
        }
        toast.error("Đăng ký không thành công, vui lòng thử lại sau");
      }
      if (res.status === 500) {
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
      setDialogOpen(false);
    });
  };

  const handleDeleteSubscription = (id: number) => {
    customerService.deleteSubscription(id).then((res) => {
      if (res.status === 200) {
        toast.success("Đã xóa đăng ký thành công");
        setSubscriptions((prev) =>
          prev.filter((subscription) => subscription.subscriptionId !== id)
        );
      }
      if (res.status === 400) {
        toast.error("Đăng ký không tồn tại");
      }
      if (res.status === 500) {
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    });
  };

  useEffect(() => {
    customerService.getSubscriptions().then((res) => {
      if (res.status === 200 && res.data.data) {
        setSubscriptions(res.data.data);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <div className=" bg-gray-50 py-8">
      <CreateSubscriptionDialog
        open={isDialogOpen}
        setOpen={setDialogOpen}
        onSubmit={handleAddSubscription}
      />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Đăng ký nhận tin theo khu vực
            </h1>
            <p className="text-muted-foreground">
              Nhận thông báo khi có tin đăng mới tại khu vực bạn quan tâm
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Đăng ký mới
          </Button>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-[#ff6d0b]/10 flex items-center justify-center text-[#ff6d0b] flex-shrink-0">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Nhận thông báo tin đăng mới</h3>
              <p className="text-sm text-gray-500">
                Đăng ký nhận thông báo khi có tin đăng mới tại khu vực bạn quan
                tâm. Bạn có thể đăng ký nhiều khu vực khác nhau và quản lý các
                đăng ký của mình dưới đây.
              </p>
            </div>
          </div>
        </Card>

        <SubscriptionList
          subscriptions={subscriptions}
          isLoading={isLoading}
          onDelete={handleDeleteSubscription}
        />
      </div>
    </div>
  );
}

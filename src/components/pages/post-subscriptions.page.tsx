import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, Plus } from "lucide-react";
import { SubscriptionList } from "../elements/subscription-list.element";
import { SubscriptionDialog } from "../elements/subscription-dialog.element";

// Mock data for subscriptions
const generateMockSubscriptions = (count: number, startIndex = 0) => {
  return Array.from({ length: count }, (_, i) => ({
    subscriptionId: startIndex + i + 1,
    customerId: 1,
    ward:
      i % 3 === 0
        ? undefined
        : `Phường ${
            ["Tân Phong", "Bến Nghé", "Phú Mỹ", "Tân Quy", "An Phú"][i % 5]
          }`,
    district: `Quận ${["1", "2", "3", "7", "Bình Thạnh", "Thủ Đức"][i % 6]}`,
    city: ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"][i % 4],
    createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

export default function SubscriptionsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState(
    generateMockSubscriptions(10)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMoreSubscriptions = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newSubscriptions = generateMockSubscriptions(10, page * 10);

    // After 5 pages, we'll say there's no more data
    if (page >= 5) {
      setHasMore(false);
    }

    setSubscriptions((prev) => [...prev, ...newSubscriptions]);
    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  const handleAddSubscription = (data: {
    city: string;
    district: string;
    ward?: string;
  }) => {
    const newSubscription = {
      subscriptionId: Math.floor(Math.random() * 1000) + 100,
      customerId: 1,
      ward: data.ward || undefined,
      district: data.district,
      city: data.city,
      createdAt: new Date().toISOString(),
    };

    setSubscriptions((prev) => [newSubscription, ...prev]);
    setIsDialogOpen(false);
  };

  const handleDeleteSubscription = (id: number) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.subscriptionId !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
            onClick={() => setIsDialogOpen(true)}
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
          onLoadMore={loadMoreSubscriptions}
          isLoading={isLoading}
          hasMore={hasMore}
          onDelete={handleDeleteSubscription}
        />

        <SubscriptionDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleAddSubscription}
        />
      </div>
    </div>
  );
}

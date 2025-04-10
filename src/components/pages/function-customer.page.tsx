import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FunctionCustomerSidebar } from "../elements/functoion-sidebar.element";
import { ListSavedPost } from "../elements/saved-post.element";
import SubscriptionsPage from "./post-subscriptions.page";
import { HistoryPostElement } from "../elements/history-post.element";

export default function FunctionCustomerPage() {
  const [activeTab, setActiveTab] = useState("savedPost");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">
          {activeTab === "savedPost" && "Bài viết đã lưu "}
          {activeTab === "historyView" && "Lịch sử xem tin"}
          {activeTab === "post-subscription" && "Đăng kí nhận tin theo khu vực"}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <FunctionCustomerSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <Card className="p-6">
              {activeTab === "savedPost" && <ListSavedPost />}
              {activeTab === "historyView" && <HistoryPostElement />}
              {activeTab === "post-subscription" && <SubscriptionsPage></SubscriptionsPage>}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

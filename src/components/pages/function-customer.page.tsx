import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PasswordChangeForm } from "../elements/password-change-form.element";
import { ProfileInfoForm } from "../elements/profile-info-form.element";
import { SocialConnections } from "../elements/social-connections.element";
import { FunctionCustomerSidebar } from "../elements/functoion-sidebar.element";

export default function FunctionCustomerPage() {
  const [activeTab, setActiveTab] = useState("savedPost");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">
          {activeTab === "savedPost" && "Bài viết đã lưu "}
          {activeTab === "historyView" && "Lịch sử xem tin"}
          {activeTab === "appointment" && "Cuộc hẹn"}
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
              {activeTab === "savedPost" && <PasswordChangeForm />}
              {activeTab === "historyView" && <ProfileInfoForm />}
              {activeTab === "appointment" && <SocialConnections />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AccountSettingsSidebar } from "../elements/account-settings-sidebar.element";
import { PasswordChangeForm } from "../elements/password-change-form.element";
import { ProfileInfoForm } from "../elements/profile-info-form.element";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">

        <h1 className="text-2xl font-bold mb-6">
          {activeTab === "password" && "Cài đặt tài khoản"}
          {activeTab === "profile" && "Thông tin cá nhân"}
          {activeTab === "login-history" && "Quản lý lịch sử đăng nhập"}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <AccountSettingsSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <Card className="p-6">
              {activeTab === "password" && <PasswordChangeForm />}
              {activeTab === "profile" && <ProfileInfoForm />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

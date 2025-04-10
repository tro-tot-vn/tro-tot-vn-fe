"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User, Calendar1 } from "lucide-react";

interface AccountSettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function FunctionCustomerSidebar({
  activeTab,
  setActiveTab,
}: AccountSettingsSidebarProps) {
  const menuItems = [
    {
      id: "savedPost",
      label: "Bài viết đã lưu",
      icon: <User className="h-4 w-4 mr-2" />,
    },
    {
      id: "historyView",
      label: "Lịch sử xem tin",
      icon: <Calendar1 className="h-4 w-4 mr-2" />,
    },
    {
      id: "post-subscription",
      label: "Đăng kí nhận tin theo khu vực",
      icon: <Calendar1 className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="bg-white">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "w-full text-left px-4 py-3 flex items-center text-sm border-b border-gray-100 hover:bg-gray-50 transition-colors",
              activeTab === item.id
                ? "font-medium text-[#ff6d0b]"
                : "text-gray-700"
            )}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </Card>
  );
}

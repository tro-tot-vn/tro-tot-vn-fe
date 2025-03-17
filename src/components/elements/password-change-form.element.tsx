"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function PasswordChangeForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPhone: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, showPhone: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    console.log("Password change submitted:", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Thay đổi mật khẩu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">
              Mật khẩu hiện tại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">
              Mật khẩu mới <span className="text-red-500">*</span>
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Xác nhận mật khẩu mới <span className="text-red-500">*</span>
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
          >
            ĐỔI MẬT KHẨU
          </Button>
        </form>
      </div>

      <div className="pt-6 border-t">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">
              Cho phép người mua liên lạc qua điện thoại
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Khi bật tính năng này, số điện thoại sẽ hiển thị trên tất cả tin
              đăng của bạn.
            </p>
          </div>
          <Switch
            checked={formData.showPhone}
            onCheckedChange={handleSwitchChange}
            className="data-[state=checked]:bg-[#ff6d0b]"
          />
        </div>
      </div>

      <div className="pt-6 border-t">
        <Button variant="link" className="text-blue-600 p-0 h-auto">
          Yêu cầu chấm dứt tài khoản
        </Button>
      </div>
    </div>
  );
}

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "antd";
import useAuth from "@/hooks/use-auth";

export function ProfileInfoForm() {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    phone: auth.user?.phone || "",
    bio: auth.user?.customer.bio || "",
    lastName: auth.user?.customer.lastName || "",
    firstName: auth.user?.customer.firstName || "",
    // nickname: "",
    email: auth.user?.email || "",
    gender: auth.user?.customer.gender || "",
    birthDate: auth.user?.customer.birthday || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement profile update logic here
    console.log("Profile update submitted:", formData);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hồ sơ cá nhân</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Họ và tên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">
              Họ và tên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            Số điện thoại <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled
            className="bg-gray-100"
          />
        </div>
        {/* <div className="space-y-2">
          <Label htmlFor="address">Địa chỉ</Label>
          <div className="relative">
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Địa chỉ"
            />
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div> */}

        <div className="space-y-2">
          <Label htmlFor="bio">Giới thiệu</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Viết vài dòng giới thiệu về bạn..."
            className="min-h-[100px]"
          />
          <div className="text-right text-xs text-gray-500">Tối đa 60 từ</div>
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="nickname">Tên gợi nhớ</Label>
          <Input
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="Tên gợi nhớ"
          />
          <div className="text-xs text-gray-500"></div>
        </div> */}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="flex-1"
            />
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Liên kết
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="gender">Giới tính</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Nam</SelectItem>
                <SelectItem value="Female">Nữ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Ngày, tháng, năm sinh</Label>
            <DatePicker format="DD/MM/YYYY"></DatePicker>
          </div>
        </div>

        <Button
          type="submit"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          LƯU THAY ĐỔI
        </Button>
      </form>
    </div>
  );
}

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "antd";
import { CustomerService } from "@/services/customer.service";
import { toast } from "sonner";
import moment from "moment";
import locationService, {
  ResultProvinceResponse,
} from "@/services/location.service";
import getCurrentFileUrl from "@/utils/get-file-url";
import { Gender } from "@/services/types/value-object.enum";

const customerService = new CustomerService();

export function ProfileInfoForm() {
  const [listOfProvinces, setListProvince] = useState<ResultProvinceResponse[]>(
    []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    phone: "",
    bio: "",
    address: undefined as string | undefined,
    lastName: "",
    firstName: "",
    email: "",
    gender: "",
    birthDate: "",
    avatar: undefined as number | undefined,
    avatarFile: undefined as File | undefined,
  });

  useEffect(() => {
    locationService.getAllProvinces().then((res) => {
      if (res) {
        if (res.status === 200) {
          console.log(res.data.results);
          setListProvince(res.data.results);
        }
      }
    });
  }, []);

  useEffect(() => {
    customerService
      .getMyProfile()
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          if (!data) {
            toast("Đã xảy ra lỗi khi tải thông tin cá nhân");
            return;
          }
          console.log("Profile data:", data);
          setFormData({
            phone: data.account.phone || "",
            address: data.address || "",
            bio: data.bio || "",
            lastName: data.lastName || "",
            firstName: data.firstName || "",
            email: data.account.email || "",
            gender: data.gender || "",
            birthDate: data.birthday
              ? moment(data.birthday).format("DD-MM-YYYY")
              : "",
            avatar: data.avatar || undefined,
            avatarFile: undefined,
          });
        } else {
          toast("Đã xảy ra lỗi khi tải thông tin cá nhân");
        }
      })
      .catch((err) => {
        console.log("Error fetching profile:", err);
        toast("Đã xảy ra lỗi khi tải thông tin cá nhân");
      });
  }, []);

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
    toast("Đang cập nhật thông tin cá nhân...");
    console.log("Profile update submitted:", formData);
    customerService
      .updateMyProfile({
        ...formData,
      })
      .then((res) => {
        console.log("Profile update response:", res);
        if (res.status === 200) {
          toast("Cập nhật thông tin cá nhân thành công");
        } else if (res.status === 400) {
          if (res.data.message === "EMAIL_ALREADY_EXISTS") {
            toast("Email đã tồn tại, vui lòng thử lại");
          }
        } else {
          toast("Đã xảy ra lỗi khi cập nhật thông tin cá nhân");
        }
      })
      .catch((err) => {
        console.log("Error updating profile:", err);
        toast("Đã xảy ra lỗi khi cập nhật thông tin cá nhân");
      });
  };

  function handleAvatarClick(): void {
    fileInputRef.current?.click();
  }
  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatarFile: file,
      }));
    }
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hồ sơ cá nhân</h2>

      <div className="flex justify-center mb-8">
        <div className="relative group">
          <div
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 cursor-pointer group-hover:border-blue-400 transition-all duration-200"
            // onClick={handleAvatarClick}
          >
            {formData.avatarFile ? (
              <img
                src={
                  formData.avatarFile
                    ? URL.createObjectURL(formData.avatarFile)
                    : ""
                }
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={
                  formData.avatar
                    ? getCurrentFileUrl(formData.avatar)
                    : formData.gender == Gender.MALE
                    ? "/male-avatar.png"
                    : "/female-avatar.jpg"
                }
                alt="Avatar"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Hover Overlay */}
          <div
            className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
            onClick={handleAvatarClick}
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-white bg-opacity-90 rounded-lg px-3 py-1 text-sm font-medium text-gray-800">
                Thay đổi ảnh
              </div>
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Họ <span className="text-red-500">*</span>
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
              Tên <span className="text-red-500">*</span>
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
        <div className="space-y-2">
          <Label htmlFor="city">Chọn thành phố *</Label>
          {listOfProvinces.length > 0 && formData.address ? (
            <Select
              defaultValue={
                listOfProvinces.find(
                  (province) => province.province_name === formData.address
                )?.province_id ?? undefined
              }
              onValueChange={(value) => {
                console.log(
                  "Selected province ID:",
                  value,
                  " ",
                  formData.address
                );
                setFormData((prev) => ({
                  ...prev,
                  address:
                    listOfProvinces.find(
                      (province) => province.province_id === value
                    )?.province_name ?? "",
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listOfProvinces.map((province) => (
                    <SelectItem
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Input
              value={formData.address || ""}
              placeholder="Loading thành phố..."
              disabled
              className="bg-gray-100"
            />
          )}
        </div>

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
            <DatePicker
              format="DD/MM/YYYY"
              value={
                formData.birthDate
                  ? moment(formData.birthDate, "DD-MM-YYYY")
                  : null
              }
              onChange={(date, dateString) => {
                console.log("Selected date:", date, dateString);
                handleSelectChange(
                  "birthDate",
                  Array.isArray(dateString) ? dateString[0] : dateString
                );
              }}
            />
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

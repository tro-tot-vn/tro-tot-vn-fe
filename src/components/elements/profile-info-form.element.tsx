import type React from "react";
import { useEffect, useState } from "react";
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
import { CustomerService } from "@/services/customer.service";
import { toast } from "sonner";
import moment from "moment";
import LocationVNService, {
  ResultProvinceResponse,
  ResultDistrictResponse,
} from "@/services/location.service";

const customerService = new CustomerService();

export function ProfileInfoForm() {
  const [formData, setFormData] = useState({
    phone: "",
    bio: "",
    lastName: "",
    firstName: "",
    email: "",
    gender: "",
    birthDate: "",
    currentCity: "",
    currentDistrict: "",
    currentJob: "",
  });

  const [provinces, setProvinces] = useState<ResultProvinceResponse[]>([]);
  const [districts, setDistricts] = useState<ResultDistrictResponse[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");

  // Load provinces on mount
  useEffect(() => {
    LocationVNService.getAllProvinces()
      .then((res) => {
        setProvinces(res.data.results);
      })
      .catch((err) => {
        console.log("Error fetching provinces:", err);
      });
  }, []);

  // Load profile data
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
            bio: data.bio || "",
            lastName: data.lastName || "",
            firstName: data.firstName || "",
            email: data.account.email || "",
            gender: data.gender || "",
            birthDate: data.birthday
              ? new Date(data.birthday).toISOString().split("T")[0]
              : "",
            currentCity: data.currentCity || "",
            currentDistrict: data.currentDistrict || "",
            currentJob: data.currentJob || "",
          });

          // If city is set, find and load districts
          if (data.currentCity) {
            const province = provinces.find(
              (p) => p.province_name === data.currentCity
            );
            if (province) {
              setSelectedProvinceId(province.province_id);
              LocationVNService.getDistrictsByProvinceId(province.province_id)
                .then((distRes) => {
                  setDistricts(distRes.data.results);
                })
                .catch((err) => {
                  console.log("Error fetching districts:", err);
                });
            }
          }
        } else {
          toast("Đã xảy ra lỗi khi tải thông tin cá nhân");
        }
      })
      .catch((err) => {
        console.log("Error fetching profile:", err);
        toast("Đã xảy ra lỗi khi tải thông tin cá nhân");
      });
  }, [provinces]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProvinceChange = (provinceId: string) => {
    const province = provinces.find((p) => p.province_id === provinceId);
    if (province) {
      setSelectedProvinceId(provinceId);
      setFormData((prev) => ({
        ...prev,
        currentCity: province.province_name,
        currentDistrict: "", // Reset district when city changes
      }));

      // Load districts for selected province
      LocationVNService.getDistrictsByProvinceId(provinceId)
        .then((res) => {
          setDistricts(res.data.results);
        })
        .catch((err) => {
          console.log("Error fetching districts:", err);
        });
    }
  };

  const handleDistrictChange = (districtId: string) => {
    const district = districts.find((d) => d.district_id === districtId);
    if (district) {
      setFormData((prev) => ({
        ...prev,
        currentDistrict: district.district_name,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hồ sơ cá nhân</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="currentCity">Thành phố</Label>
            <Select
              value={selectedProvinceId}
              onValueChange={handleProvinceChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn thành phố" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem
                    key={province.province_id}
                    value={province.province_id}
                  >
                    {province.province_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentDistrict">Quận/Huyện</Label>
            <Select
              value={
                districts.find((d) => d.district_name === formData.currentDistrict)
                  ?.district_id || ""
              }
              onValueChange={handleDistrictChange}
              disabled={!selectedProvinceId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem
                    key={district.district_id}
                    value={district.district_id}
                  >
                    {district.district_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentJob">Công việc</Label>
          <Select
            value={formData.currentJob || undefined}
            onValueChange={(value) => handleSelectChange("currentJob", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn trạng thái công việc (Tùy chọn)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Student">Sinh viên</SelectItem>
              <SelectItem value="Employed">Đã đi làm</SelectItem>
            </SelectContent>
          </Select>
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

import type React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { TriangleAlert, X } from "lucide-react";
import { toast } from "sonner";
import authService from "@/services/auth.service";
import locationService from "@/services/location.service";
import { Province, District } from "@/services/types/location.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState("Male"); // Default is male
  const [password, setPassword] = useState("");
  const [selectedProvince, setProvince] = useState<Province>();
  const [selectedDistrict, setDistrict] = useState<District>();
  const [listOfProvinces, setListProvinces] = useState<Province[]>([]);
  const [listOfDistricts, setListDistricts] = useState<District[]>([]);
  const [currentJob, setCurrentJob] = useState("");
  const [isRegisterFailure, setRegisterFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load provinces on mount
  useEffect(() => {
    const provinces = locationService.getAllProvinces();
    setListProvinces(provinces);
  }, []);

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const districts = locationService.getDistrictsByProvinceId(selectedProvince.id);
      setListDistricts(districts);
      // Reset district when province changes
      setDistrict(undefined);
    }
  }, [selectedProvince]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await authService.registerAccount(
      phoneNumber,
      email,
      firstName,
      lastName,
      birthday,
      gender,
      password,
      selectedProvince?.name || "",
      selectedDistrict?.name || "",
      currentJob
    );

    // Kiểm tra mã trạng thái của response
    if (res) {
      console.log(res.data)
      if (res.status === 201) {
        if (res.data.data) {
          toast("Đăng ký thành công");
          navigate("/login");
        }
      } else if (res.status === 400) {
        // Xử lý validation error - hiển thị chi tiết
        setRegisterFailure(true);
        const errors = res.data.error as any[];
        if (errors && errors.length > 0) {
          // Hiển thị tất cả lỗi validation, cách nhau bởi dấu phẩy
          const errorMessages = errors.map((err: any) => err.msg).join(". ");
          setErrorMessage(errorMessages);
        } else {
          setErrorMessage("Dữ liệu không hợp lệ, vui lòng kiểm tra lại!");
        }
      } else if (res.status === 409) {
        setRegisterFailure(true);
        setErrorMessage("Email hoặc số điện thoại đã được đăng ký!");
      } else if (res.status === 402) {
        setRegisterFailure(true);
        setErrorMessage("Đã xảy ra lỗi khi đăng ký, vui lòng thử lại!");
      } else {
        setRegisterFailure(true);
        setErrorMessage("Đã xảy ra lỗi, vui lòng thử lại!");
      }
    } else {
      // Nếu không có phản hồi từ server (res là null hoặc undefined)
      setRegisterFailure(true);
      setErrorMessage(
        "Không nhận được phản hồi từ máy chủ, vui lòng thử lại sau!"
      );
    }
  };

  const clearPhoneNumber = () => {
    setPhoneNumber("");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: "url('/login-background.avif') center/cover no-repeat",
      }}
    >
      <div
        className="w-full max-w-[440px] space-y-6 shadow-[0px_0px_8px_0px_rgba(30,40,60,0.1)] rounded-md
      bg-white p-8"
      >
        <div>
          <img
            src="/tro-tot-logo-png.jpeg"
            alt="Logo"
            width={120}
            height={40}
            className="mx-auto"
          />
          <h1 className="text-2xl font-semibold mt-6">Đăng ký</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterFailure && (
            <div className="bg-[#FFE5EA] flex flex-row text-center rounded-md p-2">
              <TriangleAlert
                color="red"
                className="m-1"
                size={20}
              ></TriangleAlert>
              <p className="flex flex-1 text-[14px] text-muted-foreground justify-center items-center">
                {errorMessage} {/* Hiển thị thông báo lỗi cụ thể */}
              </p>
            </div>
          )}

          <div className="relative">
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Số điện thoại"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pr-8"
            />
            {phoneNumber && (
              <button
                type="button"
                onClick={clearPhoneNumber}
                aria-label="Xóa số điện thoại"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative">
            <Input
              id="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-8"
            />
          </div>

          <div className="relative">
            <Input
              id="firstName"
              name="firstName"
              placeholder="Họ"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="pr-8"
            />
          </div>

          <div className="relative">
            <Input
              id="lastName"
              name="lastName"
              placeholder="Tên"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="pr-8"
            />
          </div>

          <div className="relative">
            <Input
              id="birthday"
              name="birthday"
              type="date"
              value={
                birthday instanceof Date && !isNaN(birthday.getTime())
                  ? birthday.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => setBirthday(new Date(e.target.value))}
              className="pr-8"
            />
          </div>

          <div className="relative">
            <label htmlFor="gender" className="sr-only">
              Giới tính
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-primary shadow-gray-300 focus:ring focus:ring-primary/50 focus:outline-none"
            >
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          </div>

          <div className="relative">
            <Select
              value={selectedProvince?.id}
              onValueChange={(value) => {
                const province = listOfProvinces.find(p => p.id === value);
                setProvince(province);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Thành phố hiện tại" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listOfProvinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Select
              value={selectedDistrict?.id}
              onValueChange={(value) => {
                const district = listOfDistricts.find(d => d.id === value);
                setDistrict(district);
              }}
              disabled={!selectedProvince}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Quận/Huyện hiện tại" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listOfDistricts.map((district) => (
                    <SelectItem key={district.id} value={district.id}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Select
              value={currentJob || undefined}
              onValueChange={(value) => setCurrentJob(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Nghề nghiệp (Tùy chọn)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Student">Sinh viên</SelectItem>
                  <SelectItem value="Employed">Đã đi làm</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="pr-16"
            />
            <Button
              type="button"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3 text-primary hover:text-primary/90"
              onClick={() => setShowPassword(!showPassword)}
            >
              Hiện
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
          >
            ĐĂNG KÝ
          </Button>
        </form>

        <div className="relative">
          <Separator className="my-8" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-muted-foreground">
            Hoặc đăng ký bằng
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            <img
              src="/facebook-logo.svg"
              alt="Facebook"
              width={24}
              height={24}
              className="mr-2"
            />
            Facebook
          </Button>
          <Button variant="outline" className="w-full">
            <img
              src="/google-logo.svg"
              alt="Google"
              width={24}
              height={24}
              className="mr-2"
            />
            Google
          </Button>
        </div>

        <div className="text-center text-sm">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline text-blue-700 font-bold"
          >
            Đăng nhập
          </Link>
        </div>

        <div className="text-center text-xs text-muted-foreground space-x-2">
          <Link to="#" className="hover:underline">
            Quy chế hoạt động sàn
          </Link>
          <span>•</span>
          <Link to="#" className="hover:underline">
            Chính sách bảo mật
          </Link>
          <span>•</span>
          <Link to="#" className="hover:underline">
            Liên hệ hỗ trợ
          </Link>
        </div>
      </div>
    </div>
  );
}

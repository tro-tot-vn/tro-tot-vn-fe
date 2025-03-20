import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { TriangleAlert, X } from "lucide-react";
import authService from "@/services/auth.service";
import useAuth from "@/hooks/use-auth";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFailure, setLoginFalure] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await authService.login(phoneNumber, password);
    if (res && res.status === 200) {
      if (res.data.data) {
        auth.authenticate(
          res.data.data.account,
          res.data.data.token.accessToken,
          res.data.data.token.refreshToken
        );
        toast("Đăng nhập thành công");
        navigate("/home");
      }
    } else {
      setLoginFalure(true);
    }
  };

  const clearPhoneNumber = () => {
    setPhoneNumber("");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 "
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
          <h1 className="text-2xl font-semibold mt-6">Đăng nhập</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isLoginFailure && (
            <div className="bg-[#FFE5EA] flex flex-row text-center rounded-md p-2">
              <TriangleAlert
                color="red"
                className="m-1"
                size={20}
              ></TriangleAlert>
              <p className="flex flex-1 text-[14px] text-muted-foreground justify-center items-center">
                Số điện thoại hoặc mật khẩu chưa đúng, vui lòng kiểm tra lại
              </p>
            </div>
          )}

          <div className="relative">
            <Input
              id="username"
              name="username"
              placeholder="Số điện thoại hoặc email"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pr-8"
            />
            {phoneNumber && (
              <button
                type="button"
                onClick={clearPhoneNumber}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
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

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-primary hover:underline text-sm text-blue-600"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
          >
            ĐĂNG NHẬP
          </Button>
        </form>

        <div className="relative">
          <Separator className="my-8" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-muted-foreground">
            Hoặc đăng nhập bằng
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            <img
              src="/facebook-logo.svg"
              alt="Google"
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
          Chưa có tài khoản?{" "}
          <Link
            to="#"
            className="text-primary hover:underline text-blue-700 font-bold"
          >
            Đăng ký tài khoản mới
          </Link>
        </div>

        <div className="text-center text-xs text-muted-foreground space-x-2">
          <Link to="#" className="hover:underline">
            Quy chế hoạt động sản
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

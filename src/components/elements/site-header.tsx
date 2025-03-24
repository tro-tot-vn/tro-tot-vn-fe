import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/use-auth";
import { Role } from "@/utils/role.enum";
import {
  Bell,
  Menu,
  MessageSquare,
  Search,
  LayoutGrid,
  CircleUserRound,
  FilterIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

export function SiteHeader() {
  const nav = useNavigate();
  const auth = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white ">
      <div className="container flex h-16 items-center justify-between w-full">
        <Link to="/" className="flex-shrink-0">
          <img
            src="/tro-tot-logo-png.jpeg"
            alt="Nhà Tốt"
            width={100}
            height={40}
            className="h-8 w-auto pl-10"
          />
        </Link>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="!w-5 !h-5" />
        </Button>

        <div className="flex-1 flex max-w-xl">
          <Button variant="ghost" size="icon" className="">
            <FilterIcon className="!w-5 !h-5" />
          </Button>
          <div className="flex-1 relative">
            <Input placeholder="Tìm phòng trọ " className="pl-4 pr-10" />
            <Button
              size="icon"
              className="absolute right-0 top-0 h-full rounded-l-none bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {auth.user ? (
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
            >
              <Bell className="!w-5 !h-5" />
            </Button>
            <Link to="/messages">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:inline-flex"
              >
                <MessageSquare className="!w-5 !h-5" />
              </Button>
            </Link>
            {!(
              auth.user.role.roleName === Role.Manager ||
              auth.user.role.roleName === Role.Moderator
            ) ? (
              <div className="container flex h-16 items-center justify-between">
                <Link to="/posts/my-posts">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:inline-flex"
                  >
                    <LayoutGrid className="!w-5 !h-5" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <CircleUserRound className="!w-5 !h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <Link to={`/user/profile`}>
                      <DropdownMenuItem>Trang cá nhân</DropdownMenuItem>
                    </Link>
                    <Link to="/me/setting">
                      <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem
                      onClick={() => {
                        console.log(auth.user);
                        auth.signout();
                        nav("/");
                      }}
                    >
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <></>
            )}

            {auth.user.role.roleName === Role.Manager ||
            auth.user.role.roleName === Role.Moderator ? (
              <Link to="/a">
                <Button className="hidden md:inline-flex bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white">
                  Trang quản trị hệ thống
                </Button>
              </Link>
            ) : (
              <Button
                onClick={() => {
                  nav("/my-posts/create-post");
                }}
                className="hidden md:inline-flex bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
              >
                Đăng tin
              </Button>
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login">
              <Button className="hidden md:inline-flex bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register">
              <Button className="hidden md:inline-flex bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white">
                Đăng kí
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Bell, Menu, MessageSquare, Search, LayoutGrid, User } from "lucide-react"
import { Link } from "react-router"


export function SiteHeader() {
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
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Input placeholder="Tìm nhà trọ " className="pl-4 pr-10" />
            <Button
              size="icon"
              className="absolute right-0 top-0 h-full rounded-l-none bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Bell className="h-7 w-7" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <LayoutGrid className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Tài khoản của tôi</DropdownMenuItem>
              <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="hidden md:inline-flex bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white">ĐĂNG TIN</Button>
        </div>
      </div>
    </header>
  )
}


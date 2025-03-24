import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useAuth from "@/hooks/use-auth";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router";

export function SiteHeader() {
  const auth = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full border-white border-b-[#E8E8EB] border-2 bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 pl-4">
          <SidebarTrigger className="" />
          <Link to="/admin" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Trang quản trị</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="User menu">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  auth.signout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

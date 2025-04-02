"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FileText, Home, Shield } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Label } from "../ui/label";
import useAuth from "@/hooks/use-auth";
import { Role } from "@/utils/role.enum";

export function AdminSidebar() {
  const location = useLocation();
  const auth = useAuth();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center py-4">
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Label className="font-bold text-black">Bảng chức năng</Label>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin")}>
                  <Link to="/admin">
                    <Home className="h-5 w-5" />
                    <span
                      className={`${isActive("/admin") ? "font-bold" : ""}`}
                    >
                      Tổng quan
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <Label className="font-bold text-black">Quản lí nội dung</Label>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/admin/posts/review-post/")}
                >
                  <Link to="posts/review-post/">
                    <FileText className="h-5 w-5" />
                    <span
                      className={`${
                        isActive("/admin/posts/review-post/") ? "font-bold" : ""
                      }`}
                    >
                      Tin chờ duyệt
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {auth.user?.role.roleName === Role.Manager ? (
          <SidebarGroup>
            <SidebarGroupLabel>
              {" "}
              <Label className="font-bold text-black">Quản lí người dùng</Label>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("manager/moderator")}
                  >
                    <Link to="manager/moderators">
                      <Shield className="h-5 w-5" />
                      <span
                        className={`${
                          isActive("/admin/moderators") ? "font-bold" : ""
                        }`}
                      >
                        Kiểm duyệt viên
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <></>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          <p>© 2025 RentalAdmin</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

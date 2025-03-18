import { LoaderCircle } from "lucide-react";
import { Outlet, RouteObject } from "react-router";
import LoginPage from "@/components/pages/login.page";
import MainPage from "@/components/layouts/main.layout";
import ProtectedRouteNoAuth from "@/components/elements/protect-route-no-auth.element";
import RegisterForm from "@/components/pages/register.pages";
import MyPostPage from "@/components/pages/my-post.page";
import CreatePostPage from "@/components/pages/create-post.page";
import NotFoundPage from "@/components/pages/not-found.page";
import DashboardPage from "@/components/pages/admin-dashboard.page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/elements/admin-sideheader.element";
import { AdminSidebar } from "@/components/elements/admin-sidebar.element";
import PendingPostsPage from "@/components/pages/admin-pending-post";
import PendingPostDetailPage from "@/components/pages/admin-post-detail.page";
import ModeratorsPage from "@/components/pages/admin-moderator-manage.page";
import UserReportsPage from "@/components/pages/user-report.page";
import PostReportsPage from "@/components/pages/post-report.page";
import PostReportDetailPage from "@/components/pages/post-report-detail.page";
import CommentReportsPage from "@/components/pages/comment-report.page";
import CommentReportDetailPage from "@/components/pages/comment-report-detail";
import { PostListings } from "@/components/pages/post-listing.page";
import HomePage from "@/components/pages/home.page";
import PostDetailPage from "@/components/pages/post-detail.page";
import ProtectedRouteAuth from "@/components/elements/protect-route-auth.element";
import ProtectRouteRole from "@/components/elements/protect-role.element";
import { Role } from "@/utils/role.enum";
import SettingsPage from "@/components/pages/settings.page";
import UserProfilePage from "@/components/pages/user-profile.page";
import SubscriptionsPage from "@/components/pages/post-subscriptions.page";

const appRouterConfig: RouteObject[] = [
  {
    path: "register",
    element: <ProtectedRouteNoAuth element={<RegisterForm />} />,
  },
  {
    path: "login",
    element: <ProtectedRouteNoAuth element={<LoginPage />} />,
  },
  {
    path: "/forgot-password",
    element: (
      <div className="flex-1 flex justify-center items-center">
        <LoaderCircle className=" animate-spin" />
      </div>
    ),
  },
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "search",
        element: <PostListings />,
      },
      {
        path: "user",
        element: <Outlet />,
        children: [
          {
            path: "setting",
            element: <ProtectedRouteAuth element={<SettingsPage />} />,
          },
          {
            path: "profile",
            element: <UserProfilePage />,
          },
        ],
      },
      {
        path: "notification",
        element: <div>Notification</div>,
      },
      {
        path: "posts/my-posts",
        element: <ProtectedRouteAuth element={<MyPostPage />} />,
      },
      {
        path: "posts/subscriptions",
        element: <SubscriptionsPage></SubscriptionsPage>,
      },
      {
        path: "my-posts/create-post",
        element: <ProtectedRouteAuth element={<CreatePostPage />} />,
      },
      {
        path: "posts/detail/:postId",
        element: <PostDetailPage />,
      },
    ],
  },
  {
    path: "/a",
    element: (
      <ProtectRouteRole
        roles={[Role.Manager, Role.Moderator]}
        children={
          <SidebarProvider>
            <div className="relative flex min-w-screen flex-col">
              <SiteHeader />
              <div className="flex flex-1">
                <AdminSidebar />
                <Outlet />
              </div>
            </div>
          </SidebarProvider>
        }
      />
    ),

    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "posts/pending",
        element: <PendingPostsPage />,
      },
      {
        path: "posts/pending/:postId",
        element: <PendingPostDetailPage />,
      },
      {
        path: "manager/moderators",
        element: <ModeratorsPage />,
      },
      {
        path: "reports/users",
        element: <UserReportsPage />,
      },
      {
        path: "reports/posts",
        element: <PostReportsPage />,
      },
      { path: "reports/posts/:postId", element: <PostReportDetailPage /> },
      {
        path: "reports/comments",
        element: <CommentReportsPage />,
      },
      {
        path: "reports/comments/:commentId",
        element: <CommentReportDetailPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
export default appRouterConfig;

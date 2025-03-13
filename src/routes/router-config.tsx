import { LoaderCircle } from "lucide-react";
import { Navigate, RouteObject } from "react-router";
import LoginPage from "@/components/pages/login.page";
import MainPage from "@/components/layouts/main.layout";
import ProtectedRouteNoAuth from "@/components/elements/protect-route-no-auth.element";
import MyPostPage from "@/components/pages/my-post.page";
import CreatePostPage from "@/components/pages/create-post.page";

const appRouterConfig: RouteObject[] = [
  {
    path: "register",
    element: <></>,
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
        element: <>DashBoard</>,
      },
      {
        path: "message",
        element: <>message</>,
      },
      {
        path: "profile",
        element: <div>Users</div>,
      },
      {
        path: "notification",
        element: <div>Notification</div>,
      },
      {
        path: "my-post",
        element: <MyPostPage />,
      },
      {
        path: "create-post",
        element: <CreatePostPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
export default appRouterConfig;

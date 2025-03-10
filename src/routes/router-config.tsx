import { LoaderCircle } from "lucide-react";
import { Navigate, RouteObject } from "react-router";
import ProtectedRouteAuth from "@/components/elements/protect-route-auth.element";
import LoginPage from "@/components/pages/login.page";

const appRouterConfig: RouteObject[] = [
  {
    path: "register",
    element: <></>,
  },
  {
    path: "login",
    element: <LoginPage></LoginPage>,
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
    element: <ProtectedRouteAuth element={<></>} />,
    children: [
      {
        path: "message",
        element: <></>,
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
        path: "friends",
        element: <div>Friends</div>,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
export default appRouterConfig;


import { Navigate, RouteObject } from "react-router";
import ProtectedRouteAuth from "@/components/elements/protect-route-auth.element";
import ForgotPassword from "@/components/pages/forgot-password.pages";
import VerifyOtp from "@/components/pages/verify-otp.page";
import ResetPassword from "@/components/pages/reset-password.page";

const appRouterConfig: RouteObject[] = [
  {
    path: "register",
    element: <></>,
  },
  {
    path: "login",
    element: <></>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
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

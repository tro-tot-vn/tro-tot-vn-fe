import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet, RouteObject } from "react-router";
// import ProtectedRouteAuth from "@/components/elements/protect-route-auth.element";
import LoginPage from "@/components/pages/login.page";
import PropertyListingPage from "@/components/pages/test";

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
    path: "home",
    element: <PropertyListingPage />,
  },
  {
    path: "/",
    element: (
      <>
        {" "}
        <Outlet></Outlet>
      </>
    ),
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
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
export default appRouterConfig;

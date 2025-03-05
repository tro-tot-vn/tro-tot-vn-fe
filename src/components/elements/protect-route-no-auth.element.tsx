import useAuth from "@/hooks/use-auth";
import { JSX } from "react";
import { Navigate } from "react-router";

const ProtectedRouteNoAuth = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? element : <Navigate to="/u/message" replace />;
};
export default ProtectedRouteNoAuth;

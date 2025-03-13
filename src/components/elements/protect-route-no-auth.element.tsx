import useAuth from "@/hooks/use-auth";
import { JSX } from "react";
import { Navigate } from "react-router";

const ProtectedRouteNoAuth = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : element;
};
export default ProtectedRouteNoAuth;

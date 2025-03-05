import useAuth from "@/hooks/use-auth";
import { JSX } from "react";
import { Navigate } from "react-router";

const ProtectedRouteAuth = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" replace />;
};
export default ProtectedRouteAuth;
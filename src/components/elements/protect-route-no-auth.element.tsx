import useAuth from "@/hooks/use-auth";
import { Role } from "@/utils/role.enum";
import { JSX } from "react";
import { Navigate } from "react-router";

const ProtectedRouteNoAuth = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated ? (
    <Navigate
      to={(user?.role.roleName || null) === Role.Customer ? "/" : "/admin"}
      replace
    />
  ) : (
    element
  );
};
export default ProtectedRouteNoAuth;

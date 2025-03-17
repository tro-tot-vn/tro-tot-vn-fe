import useAuth from "@/hooks/use-auth";
import { JSX } from "react";
import { Navigate } from "react-router";

export default function ProtectRouteRole({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: string[];
}) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (roles.includes(user.role.roleName)) {
    return children;
  }
  return <Navigate to="/" replace />;
}

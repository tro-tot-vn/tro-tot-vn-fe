import useAuth from "@/hooks/use-auth";
import rolePermissionService from "@/services/role-permission.service";
import { JSX } from "react";
import { Navigate } from "react-router";

export default function ProtectPermission({
  children,
  permissionForAction,
}: {
  children: JSX.Element;
  permissionForAction: string;
}) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  // check user has this permission
  if (rolePermissionService.getRolePermission(permissionForAction)) {
    return children;
  }
  return <Navigate to="/" replace />;
}

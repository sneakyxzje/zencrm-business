import { useAuth } from "@processes/auth/models/useAuth";
import Spinner from "@shared/ui/Spinner";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type Role =
  | "ROLE_ADMIN"
  | "ROLE_MARKETING"
  | "ROLE_MARKETING_MANAGER"
  | "ROLE_SALE"
  | "ROLE_SALE_MANAGER";

export default function RoleRoute({
  map,
}: {
  map: Partial<Record<Role, JSX.Element>>;
}) {
  const { isInitializing, isLoggingin, isLoggedin, user } = useAuth();

  if (isInitializing || isLoggingin) return <Spinner />;
  if (!isLoggedin || !user) return <Navigate to="/login" replace />;

  const el = map[user.role as Role];
  return el ?? <Navigate to="/403" replace />;
}

import { useEffect, type JSX } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@processes/auth/models/useAuth";
import Spinner from "@shared/ui/Spinner";
import { useAppDispatch } from "@app/store/hooks";
import { checkAuthStatus } from "@entities/user/model/slice";

export function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const { isInitializing } = useAuth();

  useEffect(() => {
    if (isInitializing) dispatch(checkAuthStatus());
  }, [dispatch, isInitializing]);

  return <Outlet />;
}

export function GuestRoute({ children }: { children: JSX.Element }) {
  const { isInitializing, isLoggingin, isLoggedin } = useAuth();
  if (isInitializing || isLoggingin) return <Spinner />;
  if (isLoggedin) return <Navigate to="/" replace />;
  return children;
}

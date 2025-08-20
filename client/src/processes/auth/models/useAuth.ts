import { useAppSelector } from "@app/store/hooks";

export function useAuth() {
  const { user, isInitializing, isLoggingin, isLoggedin, error } =
    useAppSelector((s) => s.auth);
  return { user, isInitializing, isLoggingin, isLoggedin, error };
}

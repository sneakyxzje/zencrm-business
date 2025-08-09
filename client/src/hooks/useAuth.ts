import { useAppSelector } from "../redux/Hooks";

export const useAuth = () => {
  const { user, isLoggedin, isInitializing, isLoggingin } = useAppSelector(
    (state) => state.auth
  );
  return { user, isLoggedin, isInitializing, isLoggingin };
};

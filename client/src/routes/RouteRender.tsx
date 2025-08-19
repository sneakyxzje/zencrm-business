import { useLocation } from "react-router-dom";
import Spinner from "../components/common/loading/Spinner";
import { RouteConfig } from "./RouteConfig";
import { ErrorPage } from "../pages/Error";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/Hooks";
import { checkAuthStatus } from "../redux/slices/AuthSlices";
import { useAuth } from "../hooks/useAuth";

const RouteRender = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { user, isInitializing, isLoggingin } = useAuth();

  useEffect(() => {
    if (isInitializing) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, isInitializing]);

  if (isLoggingin || isInitializing) return <Spinner />;
  if (!user) {
    return <ErrorPage />;
  }

  const componentMap = RouteConfig[pathname];
  if (!componentMap) return <ErrorPage />;

  return componentMap[user.role] ?? <ErrorPage />;
};

export default RouteRender;

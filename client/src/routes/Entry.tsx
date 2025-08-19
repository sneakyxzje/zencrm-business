import AdminView from "../pages/Admin/AdminView";
import MarketingView from "../pages/Marketing/MarketingView";
import SaleView from "../pages/Sale/SaleView";
import { useAppDispatch } from "../redux/Hooks";
import LoginView from "../pages/Auth/LoginView";
import { useEffect } from "react";
import { checkAuthStatus } from "../redux/slices/AuthSlices";
import Spinner from "../components/common/loading/Spinner";
import { useAuth } from "../hooks/useAuth";
import { ErrorPage } from "../pages/Error";
import SaleManager from "../pages/SaleManager/SaleManager";

export const Entry = () => {
  const dispatch = useAppDispatch();
  const { isLoggedin, isInitializing, user, isLoggingin } = useAuth();

  useEffect(() => {
    if (isInitializing) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, isInitializing]);

  if (isInitializing || isLoggingin) {
    return <Spinner />;
  }
  if (!isLoggedin) {
    return <LoginView />;
  }
  if (isLoggedin && !user) {
    return <Spinner />;
  }
  if (user === null) {
    return <Spinner />;
  }
  switch (user.role) {
    case "ROLE_ADMIN":
      return <AdminView />;
    case "ROLE_MARKETING":
      return <MarketingView />;
    case "ROLE_SALE":
      return <SaleView />;
    case "ROLE_MARKETING_MANAGER":
      return <MarketingView />;
    case "ROLE_SALE_MANAGER":
      return <SaleManager />;
    default:
      return <ErrorPage />;
  }
};

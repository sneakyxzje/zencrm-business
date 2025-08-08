import AdminView from "../pages/Admin/AdminView";
import MarketingView from "../pages/Marketing/MarketingView";
import SaleView from "../pages/Sale/SaleView";
import { ErrorPage } from "../pages/Error";
import { useAppSelector, useAppDispatch } from "../redux/Hooks";
import useCurrentUser from "../hooks/useCurrentUser";
import LoginView from "../pages/Auth/LoginView";
import { useEffect } from "react";
import { checkAuthStatus } from "../redux/slices/AuthSlices";
import Spinner from "../components/common/loading/Spinner";

export const Entry = () => {
  const dispatch = useAppDispatch();
  const { isLoggedin, isInitializing } = useAppSelector((state) => state.auth);
  const { user, loading: userLoading } = useCurrentUser();

  useEffect(() => {
    if (isInitializing) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, isInitializing]);

  if (!isLoggedin) {
    return <LoginView />;
  }

  if (isInitializing || (isLoggedin && userLoading)) {
    return <Spinner />;
  }
  if (isLoggedin) {
    if (!user) {
      return <Spinner />;
    }
    switch (user.role) {
      case "ROLE_ADMIN":
        return <AdminView />;
      case "ROLE_MARKETING":
        return <MarketingView />;
      case "ROLE_SALE":
        return <SaleView />;
      default:
        return <ErrorPage />;
    }
  }
};

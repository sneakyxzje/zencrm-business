import AdminView from "../pages/Admin/AdminView";
import MarketingView from "../pages/Marketing/MarketingView";
import SaleView from "../pages/Sale/SaleView";
import { ErrorPage } from "../pages/Error";
import { useAppSelector, useAppDispatch } from "../redux/Hooks";
import useCurrentUser from "../hooks/useCurrentUser";
import LoginView from "../pages/Auth/LoginView";
import { useEffect } from "react";
import { checkAuthStatus } from "../redux/slices/AuthSlices";

export const Entry = () => {
  const dispatch = useAppDispatch();
  const { isLoggedin, isInitializing } = useAppSelector((state) => state.auth);
  const { user } = useCurrentUser();

  useEffect(() => {
    if (isInitializing) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, isInitializing]);

  if (!isLoggedin) {
    return <LoginView />;
  }

  if (isLoggedin) {
    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading user info...</p>
          </div>
        </div>
      );
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

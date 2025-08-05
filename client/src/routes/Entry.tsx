import { useAuth } from "../hooks/useAuth";
import AdminView from "../pages/Admin/AdminView";
import MarketingView from "../pages/Marketing/MarketingView";
import SaleView from "../pages/Sale/SaleView";

export const Entry = () => {
  const token = JSON.parse(localStorage.getItem("token") as string);
  useAuth();
  if (token === "admin") return <AdminView />;
  if (token === "marketing") return <MarketingView />;
  if (token === "sale") return <SaleView />;

  return null;
};

import type { JSX } from "react";
import AdminView from "../pages/Admin/AdminView";
import SaleView from "../pages/Sale/SaleView";
import MarketingCustomer from "../pages/Marketing/MarketingCustomer";
import MarketingUpload from "../pages/Marketing/MarketingUpload";

export const RouteConfig: {
  [path: string]: {
    [role: string]: JSX.Element;
  };
} = {
  "/customers": {
    ROLE_ADMIN: <AdminView />,
    ROLE_MARKETING: <MarketingCustomer />,
    ROLE_SALE: <SaleView />,
  },
  "/upload": {
    ROLE_MARKETING: <MarketingUpload />,
  },
};

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthBootstrap, GuestRoute } from "./routes/guards";
import RoleRoute from "./routes/RoleRoute";
import LoginView from "@pages/auth/login";
import MarketingView from "@pages/marketing";
import SaleView from "@pages/sale";
import SaleManager from "@pages/saleManager";
import MarketingCustomer from "@pages/marketing/customers";
import { ErrorPage } from "@pages/error";
import MarketingUploadPage from "@pages/marketing/upload/MarketingUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthBootstrap />}>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginView />
              </GuestRoute>
            }
          />

          <Route
            path="/"
            element={
              <RoleRoute
                map={{
                  ROLE_MARKETING: <MarketingView />,
                  ROLE_MARKETING_MANAGER: <MarketingView />,
                  ROLE_SALE: <SaleView />,
                  ROLE_SALE_MANAGER: <SaleManager />,
                }}
              />
            }
          />

          {/* /customers */}
          <Route
            path="/customers"
            element={
              <RoleRoute
                map={{
                  ROLE_MARKETING: <MarketingCustomer />,
                  ROLE_MARKETING_MANAGER: <MarketingCustomer />,
                  ROLE_SALE: <SaleView />,
                }}
              />
            }
          />

          <Route
            path="/upload"
            element={
              <RoleRoute
                map={{
                  ROLE_MARKETING: <MarketingUploadPage />,
                  ROLE_MARKETING_MANAGER: <MarketingUploadPage />,
                }}
              />
            }
          />

          {/* 403 & 404 */}
          <Route path="/403" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

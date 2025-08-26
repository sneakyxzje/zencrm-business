import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthBootstrap, GuestRoute } from "./routes/guards";
import RoleRoute from "./routes/RoleRoute";
import LoginView from "@pages/auth/login";
import { ErrorPage } from "@pages/error";
import MarketingView from "@pages/Marketing";
import SalePage from "@pages/Sale";
import SaleManager from "@pages/SaleManager";
import MarketingCustomersPage from "@pages/Marketing/customers";
import MarketingUploadPage from "@pages/Marketing/upload/MarketingUpload";
import { ToastProvider } from "@app/provider/ToastProvider";
import LeadPage from "@pages/Marketing/leads/LeadPage";
import { LeadDetailsPage } from "@pages/Sale/leads/LeadPage";

function App() {
  return (
    <ToastProvider>
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
                    ROLE_SALE: <SalePage />,
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
                    ROLE_MARKETING: <MarketingCustomersPage />,
                    ROLE_MARKETING_MANAGER: <MarketingCustomersPage />,
                    ROLE_SALE: <SalePage />,
                  }}
                />
              }
            />

            <Route
              path="/leads/:leadId"
              element={
                <RoleRoute
                  map={{
                    ROLE_MARKETING: <LeadPage />,
                    ROLE_SALE: <LeadDetailsPage />,
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
    </ToastProvider>
  );
}

export default App;

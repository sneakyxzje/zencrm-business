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
import { CreateOrder } from "@pages/Sale/order/CreateOrder";
import { DetailsOrder } from "@pages/Sale/order/DetailsOrder";
import CreateProduct from "@pages/Product/create/CreateProduct";
import ProductListView from "@pages/Product";
import { MainLayout } from "@layouts/MainLayout";
import { AdminView } from "@pages/admin";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WebSocketProvider } from "@app/provider/SocketProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 6 * 5,
      refetchOnWindowFocus: true,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                element={
                  <WebSocketProvider>
                    <MainLayout />
                  </WebSocketProvider>
                }
              >
                <Route
                  path="/"
                  element={
                    <RoleRoute
                      map={{
                        ROLE_MARKETING: <MarketingView />,
                        ROLE_MARKETING_MANAGER: <MarketingView />,
                        ROLE_SALE: <SalePage />,
                        ROLE_SALE_MANAGER: <SaleManager />,
                        ROLE_WAREHOUSE: <ProductListView />,
                        ROLE_ADMIN: <AdminView />,
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
                  path="/create-orders"
                  element={
                    <RoleRoute
                      map={{
                        ROLE_SALE: <CreateOrder />,
                      }}
                    />
                  }
                />

                <Route
                  path="/create-orders/:leadId"
                  element={
                    <RoleRoute
                      map={{
                        ROLE_SALE: <DetailsOrder />,
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
                <Route path="/create-products" element={<CreateProduct />} />
              </Route>
              {/* 403 & 404 */}
              <Route path="/403" element={<ErrorPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

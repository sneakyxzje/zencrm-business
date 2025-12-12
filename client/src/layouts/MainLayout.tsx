import { useNotificationSocket } from "@features/notifications/model/useNotificationSocket";
import { useAuth } from "@processes/auth/models/useAuth";
import { menuByRole } from "@widgets/sidebar/model/items";
import Sidebar from "@widgets/sidebar/ui/sidebar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const { user } = useAuth();

  const currentRole = user?.role || "ROLE_GUEST";

  const sidebarItems = menuByRole[currentRole] || [];
  useNotificationSocket();
  return (
    <div className="flex h-screen bg-[#232629] overflow-hidden">
      <Sidebar sideBarItems={sidebarItems} />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

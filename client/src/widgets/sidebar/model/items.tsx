import type { SidebarItems, Role } from "./types";

const marketingMenu: SidebarItems[] = [
  { id: 1, name: "Home", icon: "home", path: "/" },
  { id: 2, name: "Announcement", icon: "announcement", path: "/announcement" },
  { id: 3, name: "Customers", icon: "customers", path: "/customers" },
  { id: 4, name: "Campaigns", icon: "campaigns", path: "/campaigns" },
  { id: 5, name: "Order Materials", icon: "materials", path: "/orders" },
];

const saleMenu: SidebarItems[] = [
  { id: 1, name: "Home", icon: "home", path: "/" },
  { id: 2, name: "Announcement", icon: "announcement", path: "/announcement" },
  { id: 3, name: "Customers", icon: "customers", path: "/customers" },
];

export const menuByRole: Record<Role, SidebarItems[]> = {
  ROLE_MARKETING: marketingMenu,
  ROLE_SALE: saleMenu,
};

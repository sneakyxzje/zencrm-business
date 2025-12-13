import type { SidebarItems, Role } from "./types";

const marketingMenu: SidebarItems[] = [
  { id: 1, name: "Home", icon: "home", path: "/" },
  { id: 3, name: "Customers", icon: "customers", path: "/customers" },
];

const saleMenu: SidebarItems[] = [
  { id: 1, name: "Home", icon: "home", path: "/" },
  { id: 3, name: "Customers", icon: "customers", path: "/customers" },
];

export const menuByRole: Record<Role, SidebarItems[]> = {
  ROLE_MARKETING: marketingMenu,
  ROLE_SALE: saleMenu,
};

import type { IconKey } from "@shared/icons/key";

export type SidebarItems = {
  id: number;
  name: string;
  icon: IconKey;
  path: string;
};

export type Role =
  | "ROLE_MARKETING"
  | "ROLE_SALE"
  | "ROLE_MARKETING_MANAGER"
  | "ROLE_SALE_MANAGER"
  | string;

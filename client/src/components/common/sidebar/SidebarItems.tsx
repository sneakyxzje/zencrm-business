import React from "react";
import HomeIcon from "../icons/HomeIcon";
import CustomerIcon from "../icons/CustomerIcon";
import CampaignIcon from "../icons/CampaignIcon";
import AnnouncementIcon from "../icons/AnnouncementIcon";
import MaterialsIcon from "../icons/MaterialsIcon";
export type SidebarItems = {
  id: number;
  name: string;
  icon: React.ReactNode;
  path: string;
};

const marketingMenu: SidebarItems[] = [
  { id: 1, name: "Home", icon: <HomeIcon />, path: "/" },
  {
    id: 2,
    name: "Announcement",
    icon: <AnnouncementIcon />,
    path: "/announcement",
  },
  { id: 3, name: "Customers", icon: <CustomerIcon />, path: "/customers" },
  { id: 4, name: "Campaigns", icon: <CampaignIcon />, path: "/campaigns" },
  { id: 5, name: "Order Materials", icon: <MaterialsIcon />, path: "/orders" },
];

export const menuByRole: Record<string, SidebarItems[]> = {
  ROLE_MARKETING: marketingMenu,
};

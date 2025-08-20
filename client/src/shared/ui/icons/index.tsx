import type { ComponentType } from "react";
import type { IconKey } from "../../icons/key";
import HomeIcon from "@widgets/sidebar/ui/icons/HomeIcon";
import AnnouncementIcon from "@widgets/sidebar/ui/icons/AnnouncementIcon";
import CustomerIcon from "@widgets/sidebar/ui/icons/CustomerIcon";
import CampaignIcon from "@widgets/sidebar/ui/icons/CampaignIcon";
import MaterialsIcon from "@widgets/sidebar/ui/icons/MaterialsIcon";

const ICONS: Record<IconKey, ComponentType<{ className?: string }>> = {
  home: HomeIcon,
  announcement: AnnouncementIcon,
  customers: CustomerIcon,
  campaigns: CampaignIcon,
  materials: MaterialsIcon,
};

export function Icon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  const Cmp = ICONS[name];
  return <Cmp className={className ?? "w-5 h-5"} />;
}

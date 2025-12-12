export type LeadStatus =
  | "NEW"
  | "ASSIGNED"
  | "PROCESSING"
  | "READY_TO_ORDER"
  | "DELIVERING"
  | "WIN"
  | "CLOSED";
export const LeadStatuses = {
  ASSIGNED: "ASSIGNED" as LeadStatus,
  PROCESSING: "PROCESSING" as LeadStatus,
  READY_TO_ORDER: "READY_TO_ORDER" as LeadStatus,
  DELIVERING: "DELIVERING" as LeadStatus,
  WIN: "WIN" as LeadStatus,
  CLOSED: "CLOSED" as LeadStatus,
} as const;
export const LeadStatusArray = Object.values(LeadStatuses);
export type Lead = {
  id: number;
  customerName: string;
  phoneNumber: string;
  product: string;
  createdByName: string;
  createdByTeam: string | null;
  assigneeName: string | null;
  assigneeTeam: string | null;
  status: LeadStatus;
  address: string;
  note: string | null;
  createdAt: string;
  assignedAt: string | null;
  assignedBy: string | null;
};

interface ComboResponse {
  id: number;
  offerName: string;
  requiredQuantity: number;
  giftItemId: number | null;
  giftQuantity: number;
  isMandatory: boolean;
}

export interface ProductInLead {
  id: number;
  productName: string;
  price: number;
  amount: number;
  imageUrl: string | null;
  categoryName: string[];
  combos: ComboResponse[];
  base_unit_name: string;
  items_per_package: number;
  package_unit_name: string;
}
export type LeadDetails = {
  id: number;
  address: string;
  createdById: number;
  createdByName: string;
  createdByTeamName: string;
  customerName: string;
  phoneNumber: string;
  createdAt: string;
  assigneeId: number;
  assignee: number;
  assigneeTeam: string;
  assignedAt: string;
  note: string;
  product: ProductInLead | null;
  status: string;
};
export type LeadUploadRequest = {
  customerName: string;
  phoneNumber: string;
  productId: number;
  assignee: number | null;
  address: string | null;
};

export type UploadResponse = {
  id: number;
  customerName?: string | null;
  phoneNumber: string;
  productName: string;
  assignee?: string | null;
  address?: string | null;
  createdAt: string;
};

export type LeadItem = {
  leadId: number;
  createdByName: string;
  createdByTeam: string;
  createdAt: string;
  assignee: string;
  assigneeTeam: string;
  product: string;
  status: LeadStatus;
};

export type FindLeadResponse = {
  content: LeadItem[];
};

export interface LeadMetricsResponse {
  currentCount: number;
  previousCount: number;
  percentChange: number;
}

export interface LeadGrowthResponse {
  timePoint: string;
  value: number;
}

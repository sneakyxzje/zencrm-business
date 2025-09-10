export type LeadStatus = "NEW" | "CALLED" | "ASSIGNED" | "IN_PROGRESS";
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

export type LeadDetails = {
  id: number;
  address: string;
  productId: number;
  createdByName: string;
  createdByTeamName: string;
  customerName: string;
  phoneNumber: string;
  createdAt: string;
  assignee: number;
  assigneeTeam: string;
  assignedAt: string;
  note: string;
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

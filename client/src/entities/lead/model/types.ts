export type LeadStatus =
  | "NEW"
  | "CALLED"
  | "interested"
  | "not_interested"
  | "converted";
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
  productName: string;
  createdByName: string;
  createdByTeamName: string;
  customerName: string;
  phoneNumber: string;
  createdAt: string;
  assignee: string;
  assigneeTeam: string;
  assignedAt: string;
  note: string;
};
export type LeadUploadRequest = {
  customerName: string;
  phoneNumber: string;
  productName: string;
  assignee?: string | null;
  address?: string | null;
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
  status: LeadStatus;
};

export type FindLeadResponse = {
  content: LeadItem[];
};

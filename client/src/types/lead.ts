export type LeadStatus = "NEW" | "ASSIGNED" | "CLOSED";

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

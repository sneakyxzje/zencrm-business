export type AssignLeadPayload = { leadId: number; saleId: number };
export type AssignLeadResponse = {
  saleId: number;
  saleName: string;
  status: string;
  assignedAt: string;
  log?: { id: number; action: "ASSIGN"; actorName: string; createdAt: string };
};

export type assignLead = {
  leadId: number;
  saleId: number;
  saleName: string;
  status: string;
  assignedAt: string;
  log?: { id: number; action: "ASSIGN"; actorName: string; createdAt: string };
};

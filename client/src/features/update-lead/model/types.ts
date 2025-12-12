import type { LeadStatus } from "@entities/lead/model/types";

export type UpdateLeadPayLoad = {
  leadId: number;
  note: string;
  status: string | null;
};

export type UpdateLeadResponse = {
  note: string;
  status: LeadStatus;
};

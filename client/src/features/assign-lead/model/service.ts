import type {
  AssignLeadPayload,
  AssignLeadResponse,
} from "@features/assign-lead/model/types";
import { api } from "@shared/api/axios";

export async function assignLead({ leadId, saleId }: AssignLeadPayload) {
  const { data } = await api.post<AssignLeadResponse>(
    "/api/leads/assign-lead",
    { leadId, saleId }
  );
  return data;
}

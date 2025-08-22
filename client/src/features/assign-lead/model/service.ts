import type {
  AssignLeadPayload,
  AssignLeadResponse,
} from "@features/assign-lead/model/types";
import { api } from "@shared/api/axios";

export async function assignLead({ leadId, saleId }: AssignLeadPayload) {
  const url = `/api/sale/leads/${leadId}/assignment`;
  const { data } = await api.post<AssignLeadResponse>(url, { saleId });
  return data;
}

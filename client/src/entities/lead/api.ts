import type {
  Lead,
  LeadStatus,
  LeadUploadRequest,
  UploadResponse,
} from "@entities/lead/model/types";
import {
  type UpdateLeadResponse,
  type UpdateLeadPayLoad,
} from "@features/update-lead/model/types";
import { api } from "@shared/api/axios";
import type { Page } from "@shared/types/page";

// MARKETING ZONE - read
export async function getMarketingLeads(params?: {
  page?: number;
  size?: number;
}) {
  const { page = 0, size = 15 } = params ?? {};
  const { data } = await api.get<Page<Lead>>("/api/leads/marketing/list", {
    params: { page, size },
  });
  return data;
}

// SALE ZONE - read
export async function getSaleAssignedLeads(params?: {
  page?: number;
  size?: number;
}) {
  const { page = 0, size = 15 } = params ?? {};
  const { data } = await api.get<Page<Lead>>("/api/leads/sale/list", {
    params: { page, size },
  });
  return data;
}

// SALE MANAGER ZONE - read/queue
export async function getLeadQueue(params?: {
  page?: number;
  size?: number;
  statuses?: LeadStatus[];
  assigned?: boolean;
}) {
  const {
    page = 0,
    size = 15,
    statuses = ["NEW"],
    assigned = false,
  } = params ?? {};
  const { data } = await api.get<Page<Lead>>("/api/leads/queue", {
    params: { page, size, statuses, assigned },
  });
  return data;
}

export async function uploadLead(payload: LeadUploadRequest) {
  const res = await api.post<UploadResponse>("/api/leads/upload", {
    customerName: payload.customerName,
    phoneNumber: payload.phoneNumber,
    productName: payload.productName,
    assignee: payload.assignee ?? null,
    address: payload.address ?? null,
  });
  return res.data;
}

export async function updateLead(payload: UpdateLeadPayLoad) {
  const res = await api.post<UpdateLeadResponse>("/api/leads/update-lead", {
    leadId: payload.leadId,
    note: payload.note,
  });
  return res.data;
}

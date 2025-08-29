import {
  type FindLeadResponse,
  type Lead,
  type LeadDetails,
  type LeadStatus,
  type LeadUploadRequest,
  type UploadResponse,
} from "@entities/lead/model/types";
import {
  type UpdateLeadResponse,
  type UpdateLeadPayLoad,
} from "@features/update-lead/model/types";
import { api } from "@shared/api/axios";
import type { Page } from "@shared/types/page";

// MARKETING ZONE
export async function getMarketingLeads(params?: {
  page?: number;
  size?: number;
}) {
  const { page = 0, size = 15 } = params ?? {};
  const { data } = await api.get<Page<Lead>>("/api/marketing/leads", {
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
  const { data } = await api.get<Page<Lead>>("/api/sale/leads", {
    params: { page, size },
  });
  return data;
}

// SALE MANAGER ZONE - read/queue
export async function getLeadQueue(params?: {
  page?: number;
  size?: number;
  sort: string;
  statuses?: LeadStatus[];
  assigned?: boolean;
}) {
  const {
    page = 0,
    size = 15,
    statuses = ["NEW"],
    sort = "createdAt,desc",
    assigned = false,
  } = params ?? {};
  const { data } = await api.get<Page<Lead>>(
    "/api/sale/leads/assignment-queue",
    {
      params: { page, size, sort, statuses, assigned },
    }
  );
  return data;
}

export async function uploadLead(payload: LeadUploadRequest) {
  const res = await api.post<UploadResponse>("/api/marketing/leads", {
    customerName: payload.customerName,
    phoneNumber: payload.phoneNumber,
    productName: payload.productName,
    assignee: payload.assignee ?? null,
    address: payload.address ?? null,
  });
  return res.data;
}

export async function updateLead(payload: UpdateLeadPayLoad) {
  const url = `/api/sale/leads/${payload.leadId}`;
  const res = await api.patch<UpdateLeadResponse>(url, {
    note: payload.note,
    status: payload.status,
  });
  return res.data;
}

export async function findLead(params?: {
  phoneNumber?: string;
  status?: string;
}) {
  const { phoneNumber, status } = params ?? {};
  const res = await api.get<FindLeadResponse>("/api/leads", {
    params: { phoneNumber, status },
  });
  return res.data;
}

export async function getleadDetails(leadId: number) {
  const url = `/api/leads/${leadId}`;
  const res = await api.get<LeadDetails>(url);
  return res.data;
}

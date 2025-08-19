import { api } from "../lib/axios";
import type { assignableSales } from "../types/assignableSales";
import type { assignLead } from "../types/assignLead";
import type { Lead, LeadStatus } from "../types/lead";
import type { Page } from "../types/page";

export const LeadService = {
  // MARKETING ZONE
  list: async (params: { page?: number; size?: number }) => {
    const { page = 0, size = 15 } = params ?? {};
    const res = await api.get<Page<Lead>>("/api/leads/marketing/list", {
      params: { page, size },
    });
    return res.data;
  },

  uploadNumber: async (
    customerName: string,
    phoneNumber: string,
    productName: string,
    assignee: string | null,
    address: string | null
  ) => {
    const res = await api.post("/api/leads/upload", {
      customerName: customerName,
      phoneNumber: phoneNumber,
      productName: productName,
      assignee: assignee,
      address: address,
    });
    return res.data;
  },

  // SALE ZONE
  listLeadAssign: async (params: { page?: number; size?: number }) => {
    const { page = 0, size = 15 } = params ?? {};
    const res = await api.get<Page<Lead>>("/api/leads/sale/list", {
      params: { page, size },
    });
    return res.data;
  },

  // SALE MANAGER ZONE
  queue: async (params: {
    page?: number;
    size?: number;
    statuses?: LeadStatus[];
    assigned?: boolean;
  }) => {
    const {
      page = 0,
      size = 15,
      statuses = ["NEW"],
      assigned = false,
    } = params ?? {};
    const res = await api.get<Page<Lead>>("/api/leads/queue", {
      params: { page, size, statuses, assigned },
    });
    return res.data;
  },

  getAssignableSales: async (params: {
    page?: number;
    size?: number;
    q?: string;
    teamId?: number;
  }) => {
    const { page = 0, size = 15, q, teamId } = params ?? {};
    const res = await api.get<Page<assignableSales>>(
      "/api/user/assignable-sales",
      {
        params: { page, size, q, teamId },
      }
    );
    return res.data;
  },

  assignLead: async (params: { leadId: number; saleId: number }) => {
    const { leadId, saleId } = params ?? {};
    const res = await api.post<assignLead>("/api/leads/assign-lead", {
      leadId,
      saleId,
    });
    return res.data;
  },
};

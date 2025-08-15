import { api } from "../lib/axios";
import type { assignableSales } from "../types/assignableSales";
import type { Lead, LeadStatus } from "../types/lead";
import type { Page } from "../types/page";

export const LeadService = {
  // List for marketing
  list: async (params: { page?: number; size?: number }) => {
    const { page = 0, size = 15 } = params ?? {};
    const res = await api.get<Page<Lead>>("/api/leads/list", {
      params: { page, size },
    });
    console.log(res.data);
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
    console.log(res.data);
    return res.data;
  },
};

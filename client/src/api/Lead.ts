import { api } from "../lib/axios";
import type { Lead } from "../types/lead";
import type { Page } from "../types/page";

export const LeadService = {
  list: async (params: { page?: number; size?: number }) => {
    const { page = 0, size = 20 } = params ?? {};
    const res = await api.get<Page<Lead>>("/api/leads/list", {
      params: { page, size },
    });
    console.log(res.data);
    return res.data;
  },

  uploadNumber: async (phoneNumber: string) => {
    const res = await api.post("/api/leads/upload", {
      phoneNumber: phoneNumber,
    });
    return res.data;
  },
};

import { api } from "@shared/api/axios";

export const getLog = async (leadId: number, page = 0, size = 10) => {
  const url = `/api/leads/${leadId}/logs`;
  const params = {
    page,
    size,
    sort: "createdAt,asc",
  };
  const res = await api.get(url, { params });
  return res.data;
};

import { api } from "@shared/api/axios";

export const getLog = async (leadId: number) => {
  const params = {
    page: 0,
    size: 20,
    sort: "createdAt,asc",
  };
  const url = `/api/leads/${leadId}/logs`;
  const res = await api.get(url, { params });
  return res.data;
};

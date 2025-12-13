import { api } from "@shared/api/axios";

export const getAllGift = async () => {
  const data = await api.get("/api/gifts");
  return data;
};

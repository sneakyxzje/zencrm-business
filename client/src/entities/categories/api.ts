import { api } from "@shared/api/axios";

export const getAllCategories = async () => {
  const data = await api.get("/api/categories");
  return data;
};

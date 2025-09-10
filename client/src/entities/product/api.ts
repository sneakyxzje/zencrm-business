import type { GetAllProduct } from "@entities/product/model/type";
import { api } from "@shared/api/axios";
import type { Page } from "@shared/types/page";

export const getAllProducts = async (params?: {
  page?: number;
  size?: number;
}) => {
  const { page = 0, size = 15 } = params ?? {};
  const { data } = await api.get<Page<GetAllProduct>>("api/products", {
    params: { page, size },
  });
  return data;
};

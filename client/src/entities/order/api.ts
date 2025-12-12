import {
  type OrderChartResponse,
  type CreateOrderRequest,
  type OrderMetricsResponse,
} from "@entities/order/types/types";
import { api } from "@shared/api/axios";

export const createOrders = async (payload: CreateOrderRequest) => {
  const res = await api.post("api/orders", payload);
  return res;
};

export const getOrderMetrics = async () => {
  const { data } = await api.get<OrderMetricsResponse>("/api/metrics/order");
  return data;
};

export const getOrderGrowth = async () => {
  const { data } = await api.get<OrderChartResponse[]>(
    "/api/metrics/order-growth"
  );
  return data;
};

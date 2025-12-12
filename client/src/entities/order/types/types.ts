export interface CreateOrderRequest {
  address: string;
  phoneNumber: string;
  leadId: number;
  priceAtOrder: number;
}

export interface OrderMetricsResponse {
  currentMonth: number;
  previousMonth: number;
  percentChange: number;
}

export interface OrderChartResponse {
  timePoint: string;
  value: number;
}

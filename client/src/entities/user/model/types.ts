export type AssignableSales = {
  id: number;
  fullname: string;
  teamName: string;
};

export type Role =
  | "ROLE_ADMIN"
  | "ROLE_MARKETING"
  | "ROLE_MARKETING_MANAGER"
  | "ROLE_SALE"
  | "ROLE_SALE_MANAGER";

export type User = {
  id: number;
  role: Role | string;
  username: string;
  teamName: string;
};

export interface UserMetricsResponse {
  currentCount: number;
  previousCount: number;
  percentChange: number;
}

export interface UserGrowthData {
  timePoint: string;
  value: number;
}

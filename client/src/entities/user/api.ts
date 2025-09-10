import type { AssignableSales, User } from "@entities/user/model/types";
import { api } from "@shared/api/axios";
import type { Page } from "@shared/types/page";

export async function getAssignableSales(params?: {
  page?: number;
  size?: number;
  q?: string;
  teamId?: number;
}) {
  const { page = 0, size = 15, q, teamId } = params ?? {};
  const { data } = await api.get<Page<AssignableSales>>("/api/staff", {
    params: { page, size, q, teamId },
  });
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/api/auth/info");
  return data;
}

export async function loginRequest(email: string, password: string) {
  const { data } = await api.post("/api/auth/login", { email, password });
  return data;
}

export async function logoutRequest() {
  await api.post("/api/auth/logout");
}

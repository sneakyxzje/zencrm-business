import { api } from "../lib/axios";

const LoginRequest = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    console.log("Login successful", response.data);
    return response.data;
  } catch (err) {
    console.log("Login error", err);
    throw err;
  }
};

export default LoginRequest;

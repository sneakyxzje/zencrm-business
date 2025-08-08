import axios from "axios";

const LoginRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Login successful", response.data);
    return response.data;
  } catch (err) {
    console.log("Login error", err);
    throw err;
  }
};

export default LoginRequest;

import axios from "axios";

const Login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Typsdsde": "application/json",
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

export default Login;

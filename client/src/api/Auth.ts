const Login = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Login failed: ${response.status} - ${err}`);
    }

    const data = await response.text();
    console.log("Login successful", data);
    return data;
  } catch (err) {
    console.log("Login error", err);
    throw err;
  }
};

export default Login;

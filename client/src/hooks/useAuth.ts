import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const useAuth = () => {
  const token = JSON.parse(localStorage.getItem("token") as string);
  const navigate = useNavigate();

  useEffect(() => {
    if (!["admin", "marketing", "sale"].includes(token)) {
      navigate("/login");
    }
  }, [navigate, token]);

  return token;
};

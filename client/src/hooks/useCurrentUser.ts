import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/Hooks";

type User = {
  id: string;
  name: string;
  role: string;
};
const useCurrentUser = () => {
  const isLoggedin = useAppSelector((state) => state.auth.isLoggedin);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isLoggedin) {
      return;
    }
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/info",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Fetching current user...", response.data);

        setUser(response.data);
      } catch (err) {
        const axiosErr = err as import("axios").AxiosError;
        if (axiosErr.response?.status === 401) {
          setUser(null);
        } else if (axiosErr.response?.status === 403) {
          setUser(null);
        } else {
          console.error("Error: ", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [isLoggedin]);
  return { user, loading };
};

export default useCurrentUser;

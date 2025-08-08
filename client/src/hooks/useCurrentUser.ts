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

  console.log("useCurrentUser hooks called!");
  useEffect(() => {
    console.log("useCurrentUser hooks called in useEffect!");
    if (!isLoggedin) {
      setUser(null);
      return;
    }
    const fetchUser = async () => {
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
        } else {
          console.error("Error: ", err);
        }
      }
    };
    fetchUser();
  }, [isLoggedin]);
  return { user };
};

export default useCurrentUser;

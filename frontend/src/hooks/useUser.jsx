import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../constants/backend";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/auth/getCurrentUser`,
        {
          withCredentials: true,
        }
      );

      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading };
};

export default useUser;
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const apiBaseUrl = "http://localhost:4000/api";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Get user data if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "token in getUserData");

      if (!token) {
        setIsLoggedIn(false);
        setUserData(null);
        return;
      }

      const { data } = await axios.get(apiBaseUrl + "/user/data", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserData(null);
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
      setUserData(null);
      setIsLoggedIn(false);
    }
  };

  const value = {
    apiBaseUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

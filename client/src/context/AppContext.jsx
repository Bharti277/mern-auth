import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const apiBaseUrl = "http://localhost:4000/api";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Get user data if token exists

  const getUserData = async () => {
    try {
      const { data } = await axios.get(apiBaseUrl + "/user/data", {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
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

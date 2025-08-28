import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const apiBaseUrl = "http://localhost:4000/api";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // is authenticated state

  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get(apiBaseUrl + "/auth/is-auth", {
        withCredentials: true,
      });

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      toast.error("Error checking auth status");
    }
  };

  // Logout user
  const logout = async () => {
    try {
      const { data } = await axios.post(
        apiBaseUrl + "/auth/logout",
        {},
        { withCredentials: true }
      );
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error("Error logging out");
    }
  };
  useEffect(() => {
    getAuthStatus();
  }, []);

  // Get user data if token exists
  const getUserData = async () => {
    try {
      const { data } = await axios.get(apiBaseUrl + "/user/data", {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.user);
        setIsLoggedIn(true);
      } else {
        setUserData(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      toast.error("Session expired. Please log in again.");
    }
  };

  const value = {
    apiBaseUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

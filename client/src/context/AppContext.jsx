import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const apiBaseUrl = "http://localhost:4000/api";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(apiBaseUrl + "/auth/send-verify-otp");
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error, "error in sending otp");

      toast.error(error.message);
    }
  };

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
      toast.error("checking auth status");
    }
  };

  // Logout user
  const logout = async () => {
    try {
      const { data } = await axios.post(apiBaseUrl + "/auth/logout", {
        withCredentials: true,
      });
      if (data.success) {
        setIsLoggedIn(false);
        navigate("/");
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
    sendVerificationOtp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const { apiBaseUrl, getUserData, userData, isLoggedIn } =
    useContext(AppContext);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    if (pasteData.length === 6) {
      pasteData.split("").forEach((char, index) => {
        inputRefs.current[index].value = char;
      });
      inputRefs.current[5].focus();
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    try {
      const otp = inputRefs.current.map((input) => input.value).join("");
      const { data } = axios.post(apiBaseUrl + "/auth/verify-account", { otp });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedIn, userData]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded shadow-md"
      >
        <h1>Email Verify Otp</h1>
        <p>Enter the 6 digit code sent to your email id</p>
        <div className="" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                key={index}
                className="w-12 h-12 bg-[#333A5C] text-white text-center mx-1 rounded "
              />
            ))}
        </div>
        <button className="w-full">Verify Email</button>
      </form>
    </div>
  );
};

export default EmailVerify;

import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const navigate = useNavigate();

  const { apiBaseUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(apiBaseUrl + "/auth/send-reset-otp", {
        email,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        setIsEmailSent(true);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error, "error in sending reset password email");
    }
  };

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

  const onSubmitOtp = (e) => {
    e.preventDefault();
    let enteredOtp = "";
    inputRefs.current.forEach((input) => {
      enteredOtp += input.value;
    });
    setOtp(enteredOtp);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(apiBaseUrl + "/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);

      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error, "error in resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-white p-8 rounded shadow-md"
        >
          <h1>Reset Password</h1>
          <p>Enter your registered email id</p>
          <input
            className="border p-2 mb-4"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-200 to-indigo-600 text-white rounded-full mt-3 cursor-pointer hover:shadow-lg hover:from-indigo-300 hover:to-indigo-700">
            Submit
          </button>
        </form>
      )}
      {/* Otp input form */}
      {isEmailSent && !isOtpSubmitted && (
        <form onSubmit={onSubmitOtp} className="bg-white p-8 rounded shadow-md">
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
          <button className="w-full">Submit</button>
        </form>
      )}
      {/* Enter new password */}
      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-white p-8 rounded shadow-md"
        >
          <h1>Reset Password</h1>
          <p>Enter New Password</p>
          <input
            className="border p-2 mb-4"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-200 to-indigo-600 text-white rounded-full mt-3 cursor-pointer hover:shadow-lg hover:from-indigo-300 hover:to-indigo-700">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;

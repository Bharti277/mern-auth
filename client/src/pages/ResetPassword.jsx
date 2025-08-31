import React, { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;

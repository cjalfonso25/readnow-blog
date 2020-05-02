import React from "react";
import { useState } from "react";

const Otp = (props) => {
  const [otp, setOtp] = useState("");
  return (
    <div className="container">
      <input
        type="text"
        className="form-control"
        data-cy="input-otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="btn btn-primary"
        data-cy="submit-otp"
        onClick={() => props.history.push("/set-new-password")}
      >
        Confirm
      </button>
    </div>
  );
};

export default Otp;

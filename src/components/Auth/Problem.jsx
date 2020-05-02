import React, { useState } from "react";
import {
  verifyMembershipNo,
  verifyUsername,
} from "../../services/authServices";

const Problem = (props) => {
  const [membershipNo, setMembershipNo] = useState("");
  const [username, setUsername] = useState("");
  const [memIsValid, setMemIsValid] = useState(false);
  const [error, setError] = useState([]);

  const handleMembershipSubmit = async (e) => {
    e.preventDefault();

    try {
      await verifyMembershipNo(membershipNo);
      setMemIsValid(!memIsValid);
    } catch (err) {
      setError({ membership: "Invalid membership!" });
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyUsername(username);
      props.history.push("/otp");
    } catch (err) {
      setError({ username: "Invalid username!" });
    }
  };

  return (
    <div className="container">
      {error.membership ? (
        <div class="alert alert-danger error" role="alert">
          Invalid Membership Number
        </div>
      ) : null}
      <form id="membershipForm" onSubmit={(e) => handleMembershipSubmit(e)}>
        <input
          type="text"
          className="form-control membership-input"
          value={membershipNo}
          onChange={(e) => setMembershipNo(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-continue">
          Continue
        </button>
      </form>

      {memIsValid ? (
        <form id="usernameForm" onSubmit={(e) => handleUsernameSubmit(e)}>
          {error.username ? (
            <div class="alert alert-danger error" role="alert">
              Invalid Username Number
            </div>
          ) : null}
          <input
            type="text"
            className="form-control username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-username-submit">
            Continue
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default Problem;

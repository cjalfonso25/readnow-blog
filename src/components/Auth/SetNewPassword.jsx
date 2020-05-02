import React from "react";

const SetNewPassword = () => {
  return (
    <div className="container">
      <input type="text" data-cy="new-password" />
      <input type="text" data-cy="match-password" />
      <button className="btn btn-primary">Set New Password</button>
    </div>
  );
};

export default SetNewPassword;

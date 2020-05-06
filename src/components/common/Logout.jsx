import React, { useEffect } from "react";
import { logout } from "../../services/authServices";

const Logout = () => {
  useEffect(() => {
    logout();

    window.location = "/projects/readnow";
  }, []);

  return null;
};

export default Logout;

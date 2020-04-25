import React, { useEffect } from "react";

const Settings = () => {
  useEffect(() => {
    document.title = "Settings - Readnow";
  }, []);

  return <h1>Settings</h1>;
};

export default Settings;

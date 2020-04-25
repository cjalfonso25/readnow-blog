import React from "react";
import { Route } from "react-router-dom";
import { getCurrentUser } from "../../services/authServices";

const PublicRoute = ({ component: Component, ...rest }) => {
  const user = getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} user={user} />;
      }}
    />
  );
};

export default PublicRoute;

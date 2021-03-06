import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authServices";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getCurrentUser() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/projects/readnow/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

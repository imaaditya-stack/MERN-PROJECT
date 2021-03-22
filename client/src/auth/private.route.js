import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./auth.service";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", authenticated: false }} />
        )
      }
    />
  );
};

export default PrivateRoute;

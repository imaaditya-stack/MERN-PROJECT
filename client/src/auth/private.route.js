import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated } =
    useSelector((state) => state.authReducer) || {};

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", authenticated: false }} />
        )
      }
    />
  );
};

export default PrivateRoute;

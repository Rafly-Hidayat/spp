import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("dataAdmin");
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );
};

export default ProtectedRoutes;

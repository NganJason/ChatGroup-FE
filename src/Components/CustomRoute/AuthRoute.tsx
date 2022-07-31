import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

type AuthRouteProps = {
  isAuth: boolean;
};

function AuthRoute(props: AuthRouteProps) {
  const { isAuth } = props;

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default AuthRoute;

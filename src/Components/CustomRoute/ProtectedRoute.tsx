import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    isAuth: boolean;
}

function ProtectedRoute(props: ProtectedRouteProps) {
    const { isAuth } = props
    

  if (!isAuth) {
    return (
      <Navigate to="/login"/>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;

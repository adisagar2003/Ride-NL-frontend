import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteForNotLogged = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  let location = useLocation();
  console.log("");
  if (auth.value.isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRouteForNotLogged;

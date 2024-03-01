import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { removeAllCookies } from "../utils/cookies";

const AuthenticatedRouter = () => {
  const location = useLocation();

  if (!Cookies.get("refresh_token")) {
    Cookies.set("redirect_uri", location.pathname);
    removeAllCookies()
  } 

  return Cookies.get("refresh_token") ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRouter;

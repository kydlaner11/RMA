import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { unauthenticatedPageList } from "../constant/pageList";

const UnauthenticatedRouter = () => {
  const location = useLocation();

  return Cookies.get("refresh_token") ? (
    <Navigate to="/dashboard" />
  ) : unauthenticatedPageList.findIndex(
      (page) => location.pathname.replace("/", "") === page.path
    ) > -1 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default UnauthenticatedRouter;

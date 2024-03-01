import Cookies from "js-cookie";
import { handleLogout } from "../services/authServices";

export const getCookies = (name) => {
  const cookies = Cookies.get(name);

  if (!cookies) {
    handleLogout();
  }

  return cookies;
};

export const removeAllCookies = () => {
  Cookies.remove("refresh_token");
  Cookies.remove("access_token");
};

import { Button } from "antd";
import Cookies from "js-cookie";

export const cookiesMessage = () => {
  return "We use cookies to ensure you get the best experience on our website. By clicking accept, you agree to our use of cookies.";
};

export const cookiesButton = (notificationApi, key) => {
  const handleAccept = () => {
    Cookies.set("allow_cookies", true);
    notificationApi.destroy(key);
  };

  return (
    <Button block type="primary" size="small" onClick={handleAccept}>
      Accept all cookies
    </Button>
  );
};

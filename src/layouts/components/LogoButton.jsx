import { Button, theme } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo512.png";

const { useToken } = theme;

const LogoButton = () => {
  const navigate = useNavigate();
  const token = useToken();

  return (
    <Button
      icon={
        <img src={logo} alt="logo" height="25px" style={{ margin: "0 7px" }} />
      }
      type="primary"
      size="large"
      style={{ backgroundColor: token.colorPrimaryBg }}
      onClick={() => navigate("/")}
    />
  );
};

export default LogoButton;

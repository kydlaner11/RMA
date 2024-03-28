import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo d~net.png";

// const { useToken } = theme;

const LogoButton = () => {
  const navigate = useNavigate();
  // const token = useToken();

  return (
    <Button 
      icon={
        <img src={logo} alt="logo" height="25px" style={{ }} />
      }
      style={{ width:100 }}
      type="text"
      size="large"
      // style={{ backgroundColor: token.colorPrimaryBg }}
      onClick={() => navigate("/")}
    />
  );
};

export default LogoButton;

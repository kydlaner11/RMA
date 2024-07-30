import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/rma-ori.webp";


const LogoButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      icon={
        <img src={logo} alt="logo" height="15px" style={{marginTop: 8 }} />
      }
      style={{ width:80 }}
      type="text"
      size="large"
      // style={{ backgroundColor: token.colorPrimaryBg }}
      onClick={() => navigate("/dashboard")}
    />
  );
};

export default LogoButton;

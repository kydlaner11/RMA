import { Col, Row, theme } from "antd";
import React from "react";
import OTP from "./components/Otp";
// import adminBg from "../../assets/images/adminBg.jpg";

const { useToken } = theme;

const Login = () => {
  const { token } = useToken();

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        backgroundColor: token.colorBgLayout,
        // minHeight: '100vh',
      }}
    >
      <Col
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <OTP />
      </Col>
    </Row>
  );
};

export default Login;

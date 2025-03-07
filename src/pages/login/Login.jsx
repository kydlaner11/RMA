import { Col, Grid, Row, theme } from "antd";
import Lottie from "lottie-react";
import React from "react";
import welcomeAnimation from "../../assets/lottie/welcome.json";
import LoginForm from "./components/LoginForm";

const { useBreakpoint } = Grid;
const { useToken } = theme;

const Login = () => {
  const screens = useBreakpoint();
  const { token } = useToken();

  return (
    <Row
      justify={{ xs: "center", sm: "start" }}
      style={{
        backgroundColor: token.colorBgContainer,
        minHeight: "calc(100vh - 100px)",
        borderRadius: "12px",
        maxWidth: "900px",
        marginTop: "14px",
      }}
    >
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        style={{
          padding: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: token.colorBgContainerDisabled,
            borderRadius: "12px",
            height: screens.sm ? "100%" : "",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Lottie animationData={welcomeAnimation} loop={true} />
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        style={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoginForm />
      </Col>
    </Row>
  );
};

export default Login;

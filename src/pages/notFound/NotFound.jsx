import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import networkAnimation from "../../assets/lottie/network.json";
import { Button, Col, Grid, Row, theme } from "antd";
import { removeAllCookies } from "../../utils/cookies";
import { isAuthenticated } from "../../utils/auth";

const { useBreakpoint } = Grid;
const { useToken } = theme;

const NotFound = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const { token } = useToken();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const removeCookies = () => {
    removeAllCookies();
    window.location.href = "/";
  }

  if (isAuthenticated()) {
    // If authenticated, return null to render nothing
    return null;
  }

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
          <Lottie animationData={networkAnimation} loop={true} />
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
        <Button type="primary" onClick={removeCookies}>
          Remove Cookies and go to home
        </Button>
      </Col>
    </Row>
  );
};

export default NotFound;

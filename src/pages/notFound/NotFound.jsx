import React from "react";
import Lottie from "lottie-react";
import networkAnimation from "../../assets/lottie/network.json";
import { Col, Grid, Row, theme } from "antd";


const { useBreakpoint } = Grid;
const { useToken } = theme;

const NotFound = () => {
  const screens = useBreakpoint();
  const { token } = useToken();

  return (
    <>
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
 
    </Row>
    
    </>
    
  )
};

export default NotFound;

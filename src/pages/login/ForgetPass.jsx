import { Col, Grid, Row, theme } from "antd";
import Lottie from "lottie-react";
import React, { useState } from "react";
import mailAnimation from "../../assets/lottie/mail.json";
import EmailFormForget from "./components/EmailFormForget";
import Loading from "../loading/Loading";


const { useBreakpoint } = Grid;
const { useToken } = theme;

const ForgetPass = () => {
  const screens = useBreakpoint();
  const [loading, setLoading] = useState(false);
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
          <Lottie animationData={mailAnimation} loop={true} />
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
         {loading ? (
          <Loading /> // Render Loading component when loading is true
        ) : (
          <EmailFormForget setLoading={setLoading} /> // Pass setLoading function to EmailFormForget component
        )}
      </Col>
    </Row>
  );
};

export default ForgetPass;

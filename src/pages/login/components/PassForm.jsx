import { Button, Form, Input, message, Row, Col, Grid } from "antd";
import React, { useState } from "react";
import Lottie from "lottie-react";
import passAnimation from "../../../assets/lottie/password.json";
import { useLocation, useNavigate } from "react-router-dom";
// import logoDNet from "../../../assets/images/logo d~net.png";
import Api from "../../../api";

const { useBreakpoint } = Grid;

const PassForm = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const { token } = useParams();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
    const newToken = params.get('token');
    // console.log('Token:', newToken);

  const handleRegister = async (values) => {
      try {
          setLoading(true);
          // Kirim permintaan untuk menyimpan password baru
          await Api.post(`/api/register/password/${newToken}`, {
              password: values.password,
              password_confirmation: values.password_confirmation,
            });
          // await api.post(`/api/register/password/${token}`, {values});

          setLoading(false);
          message.success('Password reset successfully');
          navigate('/login');
      } catch (error) {
          setLoading(false);
          // console.log(error.response.data);
          message.error('Failed to reset password');
      }
  };

  return (
    <Row
      justify={{ xs: "center", sm: "start" }}
      style={{
        backgroundColor: "white",
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
            backgroundColor: "#F5F5F5",
            borderRadius: "12px",
            height: screens.sm ? "100%" : "",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Lottie animationData={passAnimation} loop={true} />
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <div style={{ width: "80%" }}>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "3px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Set Your Password</span>

        </div>
        <div style={{ fontSize: "14px", marginBottom: "36px", opacity: 0.7 }}>
        Please enter your new password below.
        </div>

        <Form
          form={form}
          onFinish={handleRegister}
          autoComplete="off"
          layout="vertical"
          className="login-form"
        >
          <Form.Item
            label="Password"
            name="password"
            className="login-password"
            rules={[
              {required: true, message: 'Please enter your password'},
              {min: 8, message: '- Password must be at least 8 characters long'},
              { pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, message: '- Password must include at least one non-numeric.' }
          ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Password Confirmation"
            name="password_confirmation"
            className="login-password"
            dependencies={['password']}
            rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                    },
                }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* <div style={{ marginBottom: 24, textAlign: "right", marginTop: 5 }}>
            <a href="/forgot_password" className="login-forgot">
              Forgot Password?
            </a>
          </div> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
              Set Password
            </Button>
          </Form.Item>
        </Form>

        {/* <Divider style={{ opacity: 0.7 }}>or</Divider>

        <Button
          type="default"
          className="login-oauth"
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={logoDNet}
            alt="Logo d~net"
            height="100%"
            style={{ marginRight: "3px" }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              opacity: 0.6,
              marginTop: "3px",
            }}
          >
            Continue with OAuth
          </span>
        </Button> */}
      </div>
      </Col>
    </Row>
  );
};

export default PassForm;

import { PlayCircleFilled } from "@ant-design/icons";
import { useTour } from "@reactour/tour";
import { Button, Divider, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoDNet from "../../../assets/images/logo d~net.png";
import { login } from "../../../redux/actions/authAction";

const steps = [
  {
    selector: ".login-form",
    content: "Login using email and password if you have one",
  },
  {
    selector: ".login-forgot",
    content: "Click here if you forgot your password",
  },
  {
    selector: ".login-oauth",
    content: "Login using OAuth if you have one",
  },
  {
    selector: ".login-signup",
    content: "Click here if you don't have any account",
  },
];

const LoginForm = () => {
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (data) => {
    try {
      dispatch(login(data));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleTour = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setCurrentStep(0);
    setSteps(steps);
  }, []);

  return (
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
        <span>Welcome!</span>

        <Button icon={<PlayCircleFilled />} onClick={handleTour} size="small">
          Run tour
        </Button>
      </div>
      <div style={{ fontSize: "14px", marginBottom: "36px", opacity: 0.7 }}>
        Log In your account
      </div>

      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="login-form"
      >
        <Form.Item
          label="Username"
          name="username"
          className="login-username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          className="login-password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          style={{ marginBottom: 8 }}
        >
          <Input.Password />
        </Form.Item>

        <div style={{ marginBottom: 24, textAlign: "right", marginTop: 5 }}>
          <a href="/forgot_password" className="login-forgot">
            Forgot Password?
          </a>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Login
          </Button>
        </Form.Item>
      </Form>

      <Divider style={{ opacity: 0.7 }}>or</Divider>

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
      </Button>

      <div
        className="login-signup"
        style={{
          fontSize: "12px",
          textAlign: "center",
          marginTop: 30,
          opacity: 0.7,
        }}
      >
        Don&lsquo;t have any account? <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
};

export default LoginForm;

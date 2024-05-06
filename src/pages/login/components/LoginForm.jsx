import { PlayCircleFilled } from "@ant-design/icons";
import { useTour } from "@reactour/tour";
import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/authAction"; // import login action
import Api from "../../../api";

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

  const onFinish = async (values) => {
    try {
      const response = await Api.post('/api/logincust', values);
      const resp = response.data;
      console.log(resp)
      if (Object.keys(resp).length === 0) {
        message.error('Please enter a valid Email');
      } else {
        dispatch(login(values));
        navigate('/');
        message.success('Login successful');
      }
    } catch (error) {
      //console.log error, if any error occurs during login process message with status 401 will be displayed to user message from backend, else message if doesn't have status display error message
      if (error.response.status === 401) {
        message.error('Invalid email or password');
      } else {
        message.error('Login failed, please try again later');
      }
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
          label="Email"
          name="email"
          type="email"
          className="login-email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
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
      <div
        className="login-signup"
        style={{
          fontSize: "12px",
          textAlign: "center",
          marginTop: 30,
          opacity: 0.7,
        }}
      >
        Don&lsquo;t have any account? <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default LoginForm;

import { Alert, Button, Form, Input, message, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../api";

const EmailForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const [errorAlert, setErrorAlert] = useState(null);


  const onFinish = async (values) => {
    const { email } = values;
    setLoading(true);
    try {
      const response = await checkEmail(email);

      if (!response.exist) {
        notification.warning({
          message: 'Check your email',
          description: 'This email is registered. Please check your email.',
          duration: 5 // durasi pesan notifikasi, opsional
        });
        navigate('/login');
      }
    } catch (error) {
      console.error('Error validating email:', error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setErrorAlert('Email already registered. ');
        } else if (status === 404) {
          message.error(data.message || 'Incorrect Email ');
        } else {
          message.error('Something went wrong');
        }
      } else {
        message.error('Network Error');
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const checkEmail = async (email) => {
    return Api.post('/api/register/customers', { email })
      .then(response => response.data)
      .catch(error => { throw error; });
  };

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
        <span>Register</span>

      </div>
      <div style={{ fontSize: "14px", marginBottom: "36px", opacity: 0.7 }}>
      Enter your email below and  we&apos;ll send you further instructions.
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="login-form"
        initialValues={{ email: '' }}
      >
        {errorAlert && (
          <Alert
            message={errorAlert}
            type="error"
            showIcon
            closable
            style={{ marginBottom: "10px" }}
          />
        )}
        <Form.Item
          name="email"
          className="login-email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
        ]}
        >
          <Input placeholder="Enter your Email"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading}>
            Check Email
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
        Already have account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default EmailForm;

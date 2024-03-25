import { Alert, Button, Form, Input, message, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../api";
import {ArrowLeftOutlined} from "@ant-design/icons";


const EmailFormForget = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const [errorAlert, setErrorAlert] = useState(null);


  const onFinish = async (values) => {
    const { email } = values;
    setLoading(true);
    try {
      const response = await checkEmail(email);

      if (response.exist === true) {
        // Lakukan sesuatu jika email ada dalam database
      } else {
        // Email tidak ditemukan dalam basis data
        notification.warning({
          message: 'Check your email',
          description: 'This email registered in our database. Please check your email.',
          duration: 5 // durasi pesan notifikasi, opsional
        });
        navigate('/login');
      }
    } catch (error) {
      console.error('Error validating email:', error);
      if (error.response) {
        // Tangani respon kesalahan dari server
        const { status, data } = error.response;
        if (status === 400) {
          // Tangani kesalahan jika terjadi kesalahan data (bad request)
          message.error(data.message || 'Your Email is not registered');
        } else if (status === 401) {
          // Tangani kesalahan jika pengguna tidak terautentikasi
          message.error(data.message || 'Incorrect Email');
        } else if (status === 422) {
          setErrorAlert('Reset password request already exists for this email');
        }
        
        else {
          // Tangani kesalahan lainnya
          message.error('Something went wrong');
        }
      } else {
        // Tangani kesalahan jika tidak ada respon dari server
        message.error('Network Error');
      }
    } finally {
      setLoading(false); // Hentikan loading setelah permintaan selesai
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const checkEmail = async (email) => {
    return Api.post('/api/forgot-password', { email })
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
        <span>Check Your Email</span>

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

        {/* <div style={{ marginBottom: 24, textAlign: "right", marginTop: 5 }}>
          <a href="/register/password" className="login-forgot">
            Forgot Password?
          </a>
        </div> */}

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
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 30,
          opacity: 0.7,
        }}
      >
        <a href="/login"><ArrowLeftOutlined /> Back to Login</a>
      </div>
    </div>
  );
};

export default EmailFormForget;

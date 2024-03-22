import { Button, Divider, Form, Input, message, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoDNet from "../../../assets/images/logo d~net.png";
import Api from "../../../api";

const EmailForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

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
          message.error(data.message || 'Please try again');
        } else if (status === 401) {
          // Tangani kesalahan jika pengguna tidak terautentikasi
          message.error(data.message || 'Incorrect Email or Password  ');
        } else {
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
        <Form.Item
          label="Email"
          name="email"
          className="login-email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
        ]}
        >
          <Input />
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
    </div>
  );
};

export default EmailForm;

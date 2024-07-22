import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Typography, Button, Form, message, Spin, notification, Grid } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import otpAnimation from "../../../assets/lottie/otp2.json";
import Api from '../../../api';
import { login } from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';



const { Text, Title } = Typography;
const { useBreakpoint } = Grid;


const OTP = () => {
  const [form] = Form.useForm();
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(3);
  const [newResend, setNewResend] = useState(4);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const divWidth = screens.xs ? 350 : 500;

  const { values } = location.state || { values: {} };
  const { email } = values;

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 100);
    }

    return () => clearInterval(timer);
  }, [resendTimer]);

  const onFinish = async (otpValues) => {
    const payload = { email, code: otpValues.otp };
    console.log("Payload for verification:", payload);
    setLoading(true);
    try {
      const response = await Api.post('/api/register/validate', payload);
      const resp = response.data;
      console.log(resp);
      message.success('OTP verified successfully');
      dispatch(login(resp));
      navigate('/dashboard');
      setFailedAttempts(0); // Reset failed attempts if verification is successful
    } catch (error) {
      console.log(error);
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      if (newFailedAttempts >= 3) {
        message.error('You have entered the wrong OTP 3 times. Redirecting to login page.');
        navigate('/login');
      } else {
        message.error('Invalid OTP, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    // const payload = { email };
    // console.log("Resending OTP to:", email);
    setLoading(true);
    setNewResend(newResend -1);
    setResendAttempts(resendAttempts - 1);
    try {
      const response = await Api.post('/api/logincust', values, {
        params: {
          attempts: newResend - 1,
        }
      });
      const resp = response.data;
      console.log(resendAttempts);
      console.log(resp);
      notification.success({
        message: 'OTP Sent',
        description: `Check your email for the verification code. You have ${resendAttempts - 1} more attempt to resend the code.`,
      });
      setResendTimer(60); // Reset the timer
    } catch (error) {
      console.log(error);
      message.error('Failed to resend OTP');
      const newResendAttempts = newResend - 1;
      setFailedAttempts(newResendAttempts);
      if (newResendAttempts <= 0) {
        message.error('You have entered the wrong OTP 3 times. Redirecting to login page.');
        navigate('/login');
      } else {
        message.error('Invalid OTP, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    //make responsive
    <Spin spinning={loading}>
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          width: divWidth,
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Lottie 
              animationData={otpAnimation}  
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <Title level={2} style={{ fontWeight: 'bold', marginTop: 1 }}>Enter OTP</Title>
          <Text>Enter the 6-digit code from your two-factor authenticator app.</Text>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          className="login-form"
        >
          <Row gutter={8} justify="center">
            <Col>
              <Form.Item
                name="otp"
                rules={[
                  {
                    required: true,
                    message: 'Please input your OTP!',
                  },
                  {
                    len: 6,
                    message: 'OTP must be exactly 6 digits!',
                  },
                ]}
              >
                <Input
                  size="large"
                  maxLength={6}
                  placeholder="OTP"
                  pattern="\d*"
                  style={{ textAlign: 'center' }}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '');
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  style={{ width: '100%', borderRadius: '25px', marginTop: '10px'}}
                  htmlType="submit"
                >
                  Verify OTP
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Text>
          Didn&apos;t receive the code? 
        </Text>
        <Button
          type="link"
          style={{  padding: 4 }}
          onClick={handleResend}
          disabled={resendTimer > 0}
        >
          Resend OTP {resendTimer > 0 && `(${resendTimer}s)`}
        </Button>
      </div>
    </Spin>
  );
};

export default OTP;

// import { PlayCircleFilled } from "@ant-design/icons";
// import { useTour } from "@reactour/tour";
import { Button, Form, Input, message, Carousel } from "antd";
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/authAction";
import logo3 from "../../../assets/images/Teakwave.png";
import logo2 from "../../../assets/images/Voltech.png";
import logo1 from "../../../assets/images/Spectrum.png";
import logo from "../../../assets/images/rma.png";


const LoginForm = () => {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (data) => {
    setLoading(true);
    try {
      dispatch(login(data));
      navigate("/");
    } catch (error) {
      // console.log(error)
      if (error) {
        message.error(error.response.data.error );
      } else if (error.response.status === 401) {
        message.error('Invalid email or password');
      } else {
        message.error('Login failed, please try again later');
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "40px" }}>
      <div >
        <div style={{ marginBottom: '20px', display:'flex', justifyContent: 'center' }}>
          <Carousel autoplay dots={false} arrows={false} style={{ width: 120, margin: '0 auto 0 5' }}>
            <div>
              <img src={logo1} alt="logo1" style={{ width: 120, margin: '0 auto' }} />
            </div>
            <div>
              <img src={logo2} alt="logo2" style={{ width: 120, margin: '0 auto' }} />
            </div>
            <div>
              <img src={logo3} alt="logo3" style={{ width: 120, margin: '0 auto' }} />
            </div>
          </Carousel>
        </div>
          <div style={{ fontSize: '28px', display:'flex', fontWeight: 'bold', alignItems: 'center' }}>
            Hey, Welcome to 
            <div style={{marginLeft: 7  }}>
              <img src={logo} alt="logo" style={{ width: 75,  marginTop: 6}} />
            </div>
          </div>
        {/* <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '3px', display: 'flex', alignItems:"center" }}>
        </div> */}
        <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: 20 }}>
          Log in to your account
        </div>
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
              message: "Please input your Email",
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
              message: "Please input your password",
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
          <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading}>
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
        Don&lsquo;t have an account? <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default LoginForm;

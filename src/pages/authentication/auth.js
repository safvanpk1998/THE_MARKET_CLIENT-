import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Input, Typography, InputNumber, Button, message, Form } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  loginUser,
  getPasswordResettingOtp,
  postConfirmOtp,
  postResetPassword,
  clearAuthError,
} from "../../slices/authSlice";
import login from "../../assets/others/login1.png";

import "./auth.scss";
const { Title } = Typography;

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginError, isAuthenticated, reset } = useSelector(
    (state) => state.user
  );

  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetpage, setResetpage] = useState(false);
  const [otp, setOtp] = useState(false);
  const [email, setEmail] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);

  const onFinish = (values) => {
    let data = {
      ...values,
    };
    if (data) {
      dispatch(loginUser(data));
    }
  };

  const getOtp = (values) => {
    setEmail(values.email);
    setOtp(true);
    setResetpage(false);

    dispatch(getPasswordResettingOtp(values));
  };
  const submitOtp = (values) => {
    values = {
      ...values,
      email: email,
    };
    setVerifyOtp(true);
    dispatch(postConfirmOtp(values));
  };
  const resetPassword = (values) => {
    values = {
      ...values,
      email: email,
    };

    dispatch(postResetPassword(values));
  };
  const handleForgotPassword = () => {
    setForgotPassword(false);
    setOtp(false);
    setVerifyOtp(false);
    setResetpage(false);
  };
  const ForgotPassword = () => {
    setForgotPassword(true);
    setResetpage(true);
  };

  useEffect(() => {
    dispatch(clearAuthError());

    if (loginError) {
      message.error(loginError.message);
    }
    if (isAuthenticated == true) {
      message.success("Successfully logged In");
      navigate("/");
    }
  }, [dispatch, isAuthenticated, loginError, reset]);

  return (
    <div className="auth-component">
      <div className="main">
        <div className="login">
          <div className="wrapper">
            {resetpage ? (
              <div>
                {" "}
                <div className="title">
                  <Title level={2}>Reset Password</Title>
                </div>
                <div className="login-form">
                  <div className="details">
                    <Form
                      name="normal_login"
                      className="login-form"
                      onFinish={getOtp}
                    >
                      <div className="password">
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              required: true,
                              type: "email",
                              message: "Please input your Email!",
                            },
                          ]}
                        >
                          <Input
                            prefix={
                              <MailOutlined className="site-form-item-icon" />
                            }
                            placeholder="Email"
                          />
                        </Form.Item>
                      </div>

                      <div className="end">
                        <Form.Item>
                          <Link
                            className="login-form-forgot"
                            onClick={handleForgotPassword}
                          >
                            Back To Login
                          </Link>
                        </Form.Item>{" "}
                      </div>

                      <Form.Item>
                        <div className="end">
                          <Button
                            id="get"
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                          >
                            Get OTP
                          </Button>
                        </div>

                        <div className="reg">
                          <span>
                            {" "}
                            Doesn't have an Account yet!{" "}
                            <Link to="/createaccount">register now!</Link>
                          </span>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            ) : null}
            {!forgotPassword ? (
              <div>
                {" "}
                <div className="title">
                  <Title level={2}>Login</Title>
                </div>
                <div className="login-form">
                  <div className="details">
                    <Form
                      name="normal_login"
                      className="login-form"
                      onFinish={onFinish}
                    >
                      <div className="name">
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              required: true,
                              type: "email",
                              message: "Please input your Email!",
                            },
                          ]}
                        >
                          <Input
                            prefix={
                              <MailOutlined className="site-form-item-icon" />
                            }
                            placeholder="Email"
                          />
                        </Form.Item>
                        <div className="password">
                          <Form.Item
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Password!",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <LockOutlined className="site-form-item-icon" />
                              }
                              type="password"
                              placeholder="Password"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="end">
                        <Form.Item>
                          <Link
                            className="login-form-forgot"
                            onClick={ForgotPassword}
                          >
                            Forgot password
                          </Link>
                        </Form.Item>{" "}
                      </div>

                      <Form.Item>
                        <div className="end">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                          >
                            Log in
                          </Button>
                        </div>
                        <div className="reg">
                          <span>
                            {" "}
                            Doesn't have an Account yet!{" "}
                            <Link to="/createaccount">register now!</Link>
                          </span>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            ) : null}

            {reset == true && forgotPassword && otp ? (
              <div>
                {" "}
                <div className="title">
                  <Title level={2}>Reset Password</Title>
                </div>
                {/* otp Has send to {email} */}
                <div className="login-form">
                  <div className="details">
                    <Form
                      name="normal_login"
                      className="login-form"
                      onFinish={submitOtp}
                    >
                      <div className="password">
                        <Form.Item
                          name="OTP"
                          rules={[
                            {
                              required: true,

                              message: "Please enter OTP",
                            },
                          ]}
                        >
                          <InputNumber placeholder="OTP" />
                        </Form.Item>
                      </div>
                      <div className="end">
                        <Form.Item>
                          <Link
                            className="login-form-forgot"
                            onClick={handleForgotPassword}
                          >
                            Back To Login
                          </Link>
                        </Form.Item>{" "}
                      </div>

                      <Form.Item>
                        <div className="end">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                          >
                            Submit OTP
                          </Button>
                        </div>
                        <div className="reg">
                          <span>
                            {" "}
                            Doesn't have an Account yet!{" "}
                            <Link to="/createaccount">register now!</Link>
                          </span>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            ) : null}

            {reset == "confirmed" && forgotPassword && verifyOtp ? (
              <div>
                {" "}
                <div className="title">
                  <Title level={2}>Reset Password</Title>
                </div>
                <div className="login-form">
                  <div className="details">
                    <Form
                      name="normal_login"
                      className="login-form"
                      onFinish={resetPassword}
                    >
                      <div className="name">
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input New Password!",
                            },
                          ]}
                        >
                          <Input
                            prefix={
                              <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="New password"
                          />
                        </Form.Item>
                      </div>
                      <div className="password">
                        <Form.Item
                          name="confirmPassword"
                          rules={[
                            {
                              required: true,
                              message: "Please input your again!",
                            },
                          ]}
                        >
                          <Input
                            prefix={
                              <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Confirm password"
                          />
                        </Form.Item>
                      </div>
                      <div className="end">
                        <Form.Item>
                          <Link
                            className="login-form-forgot"
                            onClick={handleForgotPassword}
                          >
                            Back To Login
                          </Link>
                        </Form.Item>{" "}
                      </div>

                      <Form.Item>
                        <div className="end">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                          >
                            Submit
                          </Button>
                        </div>
                        <div className="reg">
                          <span>
                            {" "}
                            Doesn't have an Account yet!{" "}
                            <Link to="/createaccount">register now!</Link>
                          </span>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="image">
          <img src={login} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Auth;

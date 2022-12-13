import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createUser, clearAuthError } from "../../slices/authSlice";
import {
  Menu,
  Input,
  Space,
  Typography,
  message,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Table,
  Checkbox,
  Form,
} from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import login from "../../assets/others/register.png";

import "./auth.scss";
const { Title } = Typography;



// const data = products.products;

function CreateAccount() {
  const { loading, loginError, user, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearAuthError());
  
    if (loginError) {
      message.error(loginError.message);
    }
    if (isAuthenticated == true) {
      message.success("Successfully logged In");
      navigate("/");
    }
  }, [isAuthenticated, loginError]);
  const dispatch = useDispatch();

  // create user function

  const onFinish = (values) => {
    let data = {
      ...values,
      image: {
        public_id: "sample image",
        url: "sampleurl",
      },
    };
    console.log(data);
    if (data) {
      dispatch(createUser(data));
    }
  };

  return (
    <div className="auth-component">
      <div className="main">
        <div className="login">
          <div className="wrapper">
            <div className="title">
              <Title level={2}>Create Account</Title>
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
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Username!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                      />
                    </Form.Item>
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
                    <Form.Item
                      name="confirm"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input
                        placeholder="Confirm Password"
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                      />
                    </Form.Item>
                  </div>

                  <Form.Item>
                    <div className="end">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Create Account
                      </Button>
                    </div>
                    <div className="reg">
                      <span>
                        {" "}
                        Do you have an Account!{" "}
                        <Link to="/login">login now!</Link>
                      </span>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="image">
          <img src={login} alt="" />
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;

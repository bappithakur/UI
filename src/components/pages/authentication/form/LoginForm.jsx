import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Switch } from "antd";
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { getLoginAction } from "../../../../core/redux/actions/AuthAction";

const LoginForm = () => {
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const { isLoading } = useSelector((state) => state.loadingReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (param) => {
    const data = {
      username: param.username,
      password: param.password,
    };

    dispatch(getLoginAction(data));
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/home");
  }, [isLoggedIn, navigate]);
  return (
    <Form
      layout="vertical"
      name="normal_login"
      className="form-horizontal auth-form my-4"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
        //help="" // hide validating message.
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <div className="form-group mb-2 row mt-3">
        <div className="col-sm-6">
          <Form.Item
            name="remember"
            label="Remember"
            valuePropName="checked"
            noStyle
          >
            <Switch size="small" />{" "}
            <label className="form-check-label">Remember me</label>
          </Form.Item>
        </div>
        <div className="col-sm-6 text-end">
          <a href="#/" className="text-muted font-13">
            <i className="dripicons-lock"></i> Forgot password?
          </a>
        </div>
      </div>
      <Button
        loading={isLoading}
        block
        type="primary"
        htmlType="submit"
        className="mt-2 btn-primary"
        icon={<LoginOutlined />}
      >
        Log in
      </Button>
    </Form>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { LoginService } from "../../../../../core/services";
import { LocalStorage } from "../../../../../core/helpers";
import { LOCAL_STORAGE_KEYS } from "../../../../../core/constants";
import { logOutAction } from "../../../../../core/redux/actions/AuthAction";

const FormChangePassword = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (param) => {
    setLoading(true);

    const response = await LoginService.postChangePassword(param);

    if (response) {
      form.resetFields();
      onClose();
      LocalStorage.removeItem(LOCAL_STORAGE_KEYS.PROFILE_KEY);
      LocalStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
      dispatch(logOutAction());
    }

    setLoading(false);
  };

  return (
    <Form
      layout="vertical"
      className="form-horizontal auth-form"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name="oldPassword"
        label="Old Password"
        rules={[
          {
            required: true,
            message: "Please enter your old password",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Old Password"
        />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          {
            required: true,
            message: "Please enter your new password",
          },
          {
            min: 6,
            message: "Password should be atleast 6 characters in length",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="New Password"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={["newPassword"]}
        rules={[
          {
            required: true,
            message: "Please re-enter your new password",
          },
          {
            min: 6,
            message: "Password should be atleast 6 characters in length",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Button
        loading={loading}
        block
        type="primary"
        htmlType="submit"
        className="mt-2 btn-primary"
      >
        Change Password
      </Button>
    </Form>
  );
};

export default FormChangePassword;

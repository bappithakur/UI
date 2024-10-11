import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { CoreService } from "../../../../core/services";

const FormUpdatePassword = ({ onClose, userId }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (param) => {
    setLoading(true);

    param.ddUserId = userId;
    delete param.confirmPassword;

    console.log(param);

    const response = await CoreService.resetPassword(param);

    if (response) {
      form.resetFields();
      onClose();
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
        Update Password
      </Button>
    </Form>
  );
};

export default FormUpdatePassword;

import React, { useState } from "react";
import { Form, Button, Col, Input, Row, Space } from "antd";

import { CoreService } from "../../../../core/services";

const FormDisease = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (param) => {
    setLoading(true);
    const response = await CoreService.createUom(param);

    if (response) {
      onClose(true);
      form.resetFields();
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Code"
            rules={[{ required: true, message: "Please enter code" }]}
          >
            <Input placeholder="Please enter code" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please enter type" }]}
          >
            <Input placeholder="Please enter type" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Please enter name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="remarks"
            label="Remarks"
            rules={[
              {
                required: true,
                message: "Please enter remarks",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Please enter remarks" />
          </Form.Item>
        </Col>
      </Row>
      <Space>
        <Button loading={loading} htmlType="submit" type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormDisease;

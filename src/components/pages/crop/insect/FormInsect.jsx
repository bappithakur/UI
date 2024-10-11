import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Space } from "antd";

import { NaturalAspectService } from "../../../../core/services/NaturalAspectService";

const FormInsect = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (param) => {
    setLoading(true);
    const response = await NaturalAspectService.createInsect(param);

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
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Please enter name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input placeholder="Please enter description" />
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
            <Input.TextArea rows={3} placeholder="Please enter remarks" />
          </Form.Item>
        </Col>
      </Row>
      <Space>
        <Button htmlType="submit" loading={loading} type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormInsect;

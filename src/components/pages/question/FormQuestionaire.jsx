import React from "react";
import { Button, Col, Form, Input, Row, Checkbox, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";

const FormQuestionaire = ({ onClose }) => {
  return (
    <Form layout="vertical" hideRequiredMark>
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
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={4} placeholder="Please enter description" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="isActive" label=" ">
            <Checkbox>Is Active</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Space className="float-end">
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormQuestionaire;

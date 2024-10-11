import React from "react";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { Option } from "antd/lib/mentions";
import TextArea from "antd/lib/input/TextArea";

const FormState = ({ onClose }) => {
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please select an country" }]}
          >
            <Select placeholder="Please select an country">
              <Option value="1">India</Option>
              <Option value="2">USA</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="zoneCode"
            label="Zone Code"
            rules={[{ required: true, message: "Please select an zone code" }]}
          >
            <Select placeholder="Please select an zone code">
              <Option value="1">NZ</Option>
              <Option value="2">SZ</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="stateCode"
            label="State Code"
            rules={[{ required: true, message: "Please enter state code" }]}
          >
            <Input placeholder="Please enter state code" />
          </Form.Item>
        </Col>
        <Col span={12}>
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
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={4} placeholder="Please enter description" />
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

export default FormState;

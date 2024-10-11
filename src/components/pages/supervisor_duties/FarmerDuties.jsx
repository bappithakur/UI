import React from "react";

import { Button, Col, Form, Input, Row, Select } from "antd";
const { Option } = Select;

const FormFarmerDuties = () => {
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="zone"
            label="Zone"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="state"
            label="State/ Proviance"
            rules={[{ required: true, message: "Please choose the dateTime" }]}
          >
            <Select placeholder="Please select an state">
              <Option value="xiao">Punjab</Option>
              <Option value="mao">Haryana</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Landno"
            label="Land No"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Button>Save</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormFarmerDuties;

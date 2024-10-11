import React from "react";

import { Button, Col, Form, Row, Select } from "antd";
const { Option } = Select;

const FormLandData = () => {
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name=""
            label="Crop Classification"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Select placeholder="Please select an Crop Classification">
              <Option value="xiao">001</Option>
              <Option value="mao">002</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="cropsubclassification"
            label="Crop Sub Classification"
            rules={[{ required: true, message: "Please enter url" }]}
          >
            <Select placeholder="Please select an Crop Sub Classification">
              <Option value="xiao">001</Option>
              <Option value="mao">002</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please choose the approver" }]}
          >
            <Select placeholder="Please select an Country">
              <Option value="xiao">India</Option>
              <Option value="mao">USA</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="state"
            label="State/Province"
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
            name="crop"
            label="Crop"
            rules={[{ required: true, message: "Please select an crop" }]}
          >
            <Select placeholder="Please select an Crop">
              <Option value="xiao">potato</Option>
              <Option value="mao">potato</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="variety"
            label="Variety"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <Select placeholder="Please select an Variety">
              <Option value="xiao">Sweet Potato</Option>
              <Option value="mao">Chipsona Potato</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Yield"
            label="Yield"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Select placeholder="Please select an Yield">
              <Option value="100Acre">10 tons</Option>
              <Option value="150Acre">100 tons</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="landuom"
            label="Land Uom"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Select placeholder="Please select an Land Uom">
              <Option value="100Acre">100Acre</Option>
              <Option value="150Acre">150Acre</Option>
            </Select>
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

export default FormLandData;

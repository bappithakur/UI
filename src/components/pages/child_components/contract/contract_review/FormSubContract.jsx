import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";

const { Option } = Select;

const FormSubContract = () => {
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="zone"
            label="Zone"
            rules={[{ required: true, message: "Please enter url" }]}
          >
            <Select placeholder="Please select an Country">
              <Option value="xiao">North</Option>
              <Option value="mao">South</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: "Please choose the approver" }]}
          >
            <Select placeholder="Please select an Condition Type">
              <Option value="xiao">Ap</Option>
              <Option value="mao">Mp</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="landNo"
            label="Land No"
            rules={[{ required: true, message: "Please choose the dateTime" }]}
          >
            <Select placeholder="Please select an Condition Type">
              <Option value="xiao">INLN0001</Option>
              <Option value="mao">INLN0001</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please select an crop" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="landType"
            label="Land Type"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please select an crop" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="landType"
            label="Land Type"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="landArea"
            label="Land Area"
            rules={[{ required: true, message: "Please select an crop" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="landUom"
            label="Land UOM"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="validTill"
            label="Valid Till"
            rules={[{ required: true, message: "Please select an crop" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="logitude"
            label="Logitude"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="lattitude"
            label="Lattitude"
            rules={[{ required: true, message: "Please select an crop" }]}
          >
            <Input disabled />
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

export default FormSubContract;

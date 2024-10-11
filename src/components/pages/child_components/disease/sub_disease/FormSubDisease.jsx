import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";

const { Option } = Select;

const FormSubDisease = (props) => {
  const { onClose } = props;
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Select placeholder="Please select an Country">
              <Option value="xiao">India</Option>
              <Option value="mao">USA</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="crop"
            label="Crop"
            rules={[{ required: true, message: "Please enter url" }]}
          >
            <Select placeholder="Please select an Crop">
              <Option value="xiao">potato</Option>
              <Option value="mao">tamoto</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="ConditionType"
            label="Condition Type"
            rules={[{ required: true, message: "Please choose the approver" }]}
          >
            <Select placeholder="Please select an Condition Type">
              <Option value="xiao">Climate</Option>
              <Option value="mao">wether</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="Condition"
            label="condition"
            rules={[{ required: true, message: "Please choose the dateTime" }]}
          >
            <Select placeholder="Please select an state">
              <Option value="xiao">Moisture</Option>
              <Option value="mao">Moisture</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="From"
            label="From"
            rules={[{ required: true, message: "Please select an crop" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="TO"
            label="To"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Uom"
            label="Uom"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Select placeholder="Please select an Yield">
              <Option value="100Acre">20 c</Option>
              <Option value="150Acre">10C</Option>
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

export default FormSubDisease;

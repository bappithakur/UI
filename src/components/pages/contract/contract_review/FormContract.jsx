import React from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";

const { Option } = Select;

const FormContract = (props) => {
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
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="crop"
            label="Contract No"
            rules={[{ required: true, message: "Please enter url" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="ConditionType"
            label="Cotract Type"
            rules={[{ required: true, message: "Please choose the approver" }]}
          >
            <Select placeholder="Please select an Condition Type">
              <Option value="xiao">Long</Option>
              <Option value="mao">5</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="ContractDtae"
            label="Contract Date"
            rules={[{ required: true, message: "Please choose the dateTime" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Busisness"
            label="Busisness Partner"
            rules={[{ required: true, message: "Please select an crop" }]}
          >
            <Select placeholder="Please select an Yield">
              <Option value="100Acre">Abc</Option>
              <Option value="150Acre">Xyz</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="valid"
            label="Vaild Till"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="ApprvoedBy"
            label="Approved By"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="approvalDate"
            label="Approval Date"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>

      <Space>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormContract;

import React from "react";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";

const { Option } = Select;

const FormWorkOrderHeader = (props) => {
  const { onClose } = props;
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="workOrderNo"
            label="Work Order No"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="WorkOrderLine"
            label="WorkOrder Line"
            rules={[{ required: true, message: "Please enter url" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="WOActivity"
            label="WOActivity"
            rules={[{ required: true, message: "Please choose the approver" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="Milestone"
            label="Milestone"
            rules={[{ required: true, message: "Please choose the dateTime" }]}
          >
            <Select placeholder="Please select Your Country">
              <Option value="xiao">Long</Option>
              <Option value="mao">5</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Activity"
            label="Activity"
            rules={[{ required: true, message: "Please select an crop" }]}
          >
            <Select placeholder="Please select Your Zone">
              <Option value="100Acre">Abc</Option>
              <Option value="150Acre">Xyz</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="SeqNo"
            label="SeqNo"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <Input value="2" disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Activity Name"
            label="Activity Name"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="activityDuration"
            label="Activity Duration"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="durationType"
            label="Duration Type"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="durationType"
            label="Linked Seq"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Intervel Type"
            label="Intervel Type"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="intervalDuration"
            label="Interval Duration"
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

export default FormWorkOrderHeader;

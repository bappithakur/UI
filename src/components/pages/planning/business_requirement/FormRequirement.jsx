import React from "react";

import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
const { Option } = Select;

const FormRequirement = (props) => {
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="businessplanno"
            label="Business Plan No"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Select placeholder="Please select an Business Plan No">
              <Option value="xiao">12345</Option>
              <Option value="mao">58907</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="planingversion"
            label="Planing Version"
            rules={[{ required: true, message: "Please enter url" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Planningdate"
            label="Planning Date"
            rules={[{ required: true, message: "Please choose the dateTime" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="plannedby"
            label="Planned By"
            rules={[{ required: true, message: "Please choose the approver" }]}
          >
            <Select placeholder="Please select an Condition Type">
              <Option value="xiao">Merino</Option>
              <Option value="mao">D-tech</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="financialyear"
            label="Financial Year"
            rules={[{ required: true, message: "Please choose the approver" }]}
          >
            <Select placeholder="Please select an Condition Type">
              <Option value="xiao">12/10/2022</Option>
              <Option value="mao">12/10/2022</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="remarks"
            label="Remarks"
            rules={[{ required: true, message: "Please choose the approver" }]}
          >
            <Input.TextArea
              rows={1}
              placeholder="please enter url description"
            />
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

export default FormRequirement;

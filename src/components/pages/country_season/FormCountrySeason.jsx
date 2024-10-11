import React from "react";

import { Button, Col, Form, Input, Row, Select, Checkbox } from "antd";
const { Option } = Select;

const FormCountrySeason = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="seasonCode"
            label="Season"
            rules={[{ required: true, message: "Please enter url" }]}
          >
            <Select placeholder="Please select an Season">
              <Option value="xiao">12345</Option>
              <Option value="mao">58907</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="countyCode"
            label="County"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Select placeholder="Please select an County">
              <Option value="xiao">In</Option>
              <Option value="mao">US</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="weekTo"
            label="Week From"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="weekto"
            label="Week to"
            rules={[{ required: true, message: "Please enter url" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="isNextYear" label="isNext Year">
            <Checkbox onChange={onChange} />
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

export default FormCountrySeason;

import React from "react";

import { Button, Col, Form, Row, Select } from "antd";
const { Option } = Select;

const FormSeasonDetail = (props) => {
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="crop"
            label="Crop"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Select placeholder="Please select an Crop">
              <Option value="xiao">Potato</Option>
              <Option value="mao">Sweet Potato</Option>
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

export default FormSeasonDetail;

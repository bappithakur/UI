import React, { useState } from "react";

import { Button, Col, Form, Row, Input, DatePicker } from "antd";
import { Utils } from "../../../../core/helpers";
import { CoreService } from "../../../../core/services";

const FormFinancialYear = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (param) => {
    param.fromDate = Utils.convertDateToDateTime(param.fromDate);
    param.toDate = Utils.convertDateToDateTime(param.toDate);

    setLoading(true);
    const response = await CoreService.createFinancialYear(param);

    if (response) {
      onClose(true);
      form.resetFields();
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Code"
            rules={[
              {
                required: true,
                message: "Please enter code",
              },
            ]}
          >
            <Input placeholder="Please enter code" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="financialYearName"
            label="Financial Year Name"
            rules={[
              {
                required: true,
                message: "Please enter financial year name",
              },
            ]}
          >
            <Input placeholder="Please enter financial year name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="fromDate"
            label="From Date"
            rules={[
              {
                required: true,
                message: "Please choose from date",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="toDate"
            label="To Date"
            rules={[
              {
                required: true,
                message: "Please choose to date",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Button htmlType="submit" loading={loading}>
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormFinancialYear;

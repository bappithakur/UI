import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { useSelector } from "react-redux";

import { CropService } from "../../../../../core/services";

const FormVariety = ({ onClose, onSuccess, cropId }) => {
  const { user } = useSelector((state) => state.authReducer);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (param) => {
    param.crCropId = cropId;
    param.ddCountryId = user.countryid;
    setLoading(true);

    const response = await CropService.createCropVariety(param);

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
        <Col span={24}>
          <Form.Item
            name="cropVarietyName"
            label="Varitey Name"
            rules={[{ required: true, message: "Please enter varitey name" }]}
          >
            <Input placeholder="Please enter varitey name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="remarks"
            label="Remarks"
            rules={[
              {
                required: true,
                message: "Please enter remarks",
              },
            ]}
          >
            <Input.TextArea rows={3} placeholder="Please enter remarks" />
          </Form.Item>
        </Col>
      </Row>
      <Space className="float-end">
        <Button onClick={onClose}>Cancel</Button>
        <Button htmlType="submit" loading={loading} type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormVariety;

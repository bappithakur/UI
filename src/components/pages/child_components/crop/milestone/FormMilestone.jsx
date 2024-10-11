import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { Button, Col, Form, Input, Row, Space } from "antd";

import { CropService } from "../../../../../core/services";

const FormMilestone = ({ onClose, onSuccess, cropId }) => {
  const { user } = useSelector((state) => state.authReducer);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (param) => {
    param.crCropId = cropId;
    param.ddCountryId = user.countryid;
    setLoading(true);

    const response = await CropService.createCropMilestone(param);

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
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Please enter name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="remarks"
            label="Remarks"
            rules={[{ required: true, message: "Please enter remarks" }]}
          >
            <TextArea placeholder="Please enter remarks" />
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

export default FormMilestone;

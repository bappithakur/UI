import React, { useState, useEffect, useCallback } from "react";

import { Button, Col, Form, Row, Input, Select } from "antd";
import { CropService } from "../../../../core/services";

const FormCrop = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [optionsCropClassification, setOptionsCropClassification] = useState(
    []
  );
  const [optionsCropSubClassification, setOptionsCropSubClassification] =
    useState([]);

  const getCropClassification = useCallback(async () => {
    const response = await CropService.getCropClassificationList();

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.cropClassName,
          value: el.crCropClassificationId,
        };
      });

      setOptionsCropClassification(list);
    }
  }, []);

  const onCropClassificationChange = async (classificationId) => {
    const response = await CropService.getCropSubClassificationList(
      classificationId
    );
    form.resetFields(["crCropSubClassificationId"]);

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.cropSubClassName,
          value: el.crCropSubClassificationId,
        };
      });

      setOptionsCropSubClassification(list);
    }
  };

  useEffect(() => {
    getCropClassification();
  }, [getCropClassification]);

  const onFinish = async (param) => {
    setLoading(true);

    const response = await CropService.createCrop(param);

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
            name="crCropClassificationId"
            label="Crop Classification"
            rules={[
              { required: true, message: "Please select crop classification" },
            ]}
          >
            <Select
              options={optionsCropClassification}
              onChange={onCropClassificationChange}
              placeholder="Please select crop classification"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="crCropSubClassificationId"
            label="Crop Sub Classification"
            rules={[
              {
                required: true,
                message: "Please select crop sub classification",
              },
            ]}
          >
            <Select
              options={optionsCropSubClassification}
              placeholder="Please select crop sub classification"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="cropName"
            label="Crop"
            rules={[{ required: true, message: "Please enter crop" }]}
          >
            <Input />
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

export default FormCrop;

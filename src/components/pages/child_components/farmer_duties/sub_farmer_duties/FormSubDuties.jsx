import React, { useState, useCallback, useEffect } from "react";
import { Button, Col, Form, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

import {
  BusinessPartnerService,
  LandService,
} from "../../../../../core/services";

const FormSubDuties = ({ header, onSuccess, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [optionsBussinesPartners, setOptionsBussinessPartners] = useState([]);

  const getBussinessPartners = useCallback(async () => {
    const response = await BusinessPartnerService.getBusinessPartnerList(
      header.ddCountryId
    );
    const list = response.map((el) => {
      return {
        label: `${el.cBpartnerCode} - ${el.businessName}`,
        value: el.cBpartnerId,
      };
    });

    setOptionsBussinessPartners(list);
  }, [header.ddCountryId]);

  useEffect(() => {
    getBussinessPartners();
  }, [getBussinessPartners]);

  const onFinish = async (param) => {
    setLoading(true);
    param.lnLandRegisterationId = header.lnLandRegisterationId;
    param.recType = "B";
    param.hrMemberId = 0;

    const response = await LandService.createFarmerDuties(param);
    if (response) {
      form.resetFields();
      onSuccess(response);
      onClose(true);
    }
    setLoading(false);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="bpBpartnerId"
            label="Business Partner"
            rules={[
              { required: true, message: "Please select business partner" },
            ]}
          >
            <Select
              options={optionsBussinesPartners}
              placeholder="Please select bussiness partner"
            ></Select>
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

export default FormSubDuties;

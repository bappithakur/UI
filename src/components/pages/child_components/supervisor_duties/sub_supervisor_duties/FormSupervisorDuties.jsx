import React, { useState, useCallback, useEffect } from "react";
import { Button, Col, Form, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

import {
  HumanResourceService,
  LandService,
} from "../../../../../core/services";

const FormSupervisorDuties = ({ header, onSuccess, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [optionsHrMembers, setOptionsHrMembers] = useState([]);

  const getHrMembers = useCallback(async () => {
    const response = await HumanResourceService.getHumanResourceMemberList();

    const list = response.map((el) => {
      return {
        label: `${el.firstName} ${
          el.middleName === null ? "" : el.middleName
        } ${el.lastName}`,
        value: el.hrMemberId,
      };
    });

    setOptionsHrMembers(list);
  }, []);

  useEffect(() => {
    getHrMembers();
  }, [getHrMembers]);

  const onFinish = async (param) => {
    setLoading(true);
    param.lnLandRegisterationId = header.lnLandRegisterationId;
    param.recType = "H";
    param.bpBpartnerId = 0;

    const response = await LandService.createSupervisorDuties(param);
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
            name="hrMemberId"
            label="HR Member"
            rules={[{ required: true, message: "Please select HR member" }]}
          >
            <Select
              options={optionsHrMembers}
              placeholder="Please select HR member"
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

export default FormSupervisorDuties;

import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Form, Row, Select, Input, DatePicker } from "antd";

import {
  BusinessPartnerService,
  CoreService,
  HumanResourceService,
} from "../../../../core/services";
import { showMessage } from "../../../../core/helpers/Notification";

const FormUser = ({ onClose, onSuccess }) => {
  const { user } = useSelector((state) => state.authReducer);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [optionsBussinessPartners, setOptionsBussinessPartners] = useState([]);
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

  const getBussinessPartners = useCallback(async () => {
    const response = await BusinessPartnerService.getBusinessPartnerList(
      user.countryid
    );
    const list = response.map((el) => {
      return {
        label: `${el.cBpartnerCode} - ${el.businessName}`,
        value: el.cBpartnerId,
      };
    });

    setOptionsBussinessPartners(list);
  }, [user.countryid]);

  useEffect(() => {
    getBussinessPartners();
    getHrMembers();
  }, [getBussinessPartners, getHrMembers]);

  const onFinish = async (param) => {
    setLoading(true);

    if (param.hrMemberId && param.bpBpartnerId) {
      showMessage(
        "Only one can be selected from Hr Member and Business partner",
        500
      );

      setLoading(false);
      return;
    }

    if (!param.hrMemberId && !param.bpBpartnerId) {
      showMessage("Please select either HR Member or Business Partner", 400);

      setLoading(false);
      return;
    }

    const response = await CoreService.createUser(param);
    if (response) {
      form.resetFields();
      onSuccess();
      onClose(true);
    }
    setLoading(false);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter name",
              },
            ]}
          >
            <Input placeholder="Please enter name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="eMail"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
              {
                type: "email",
                message: "Please enter valid email",
              },
            ]}
          >
            <Input placeholder="Please enter email" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter password" },
              {
                min: 6,
                message: "Password should be atleast 6 characters in length",
              },
            ]}
          >
            <Input placeholder="Please enter password" type="password" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="validTill"
            label="Valid Till"
            rules={[
              { required: true, message: "Please choose the valid till" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="bpBpartnerId" label="Business Partner">
            <Select
              allowClear
              options={optionsBussinessPartners}
              placeholder="Please select bussiness partner"
            ></Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="hrMemberId" label="HR Member">
            <Select
              allowClear
              options={optionsHrMembers}
              placeholder="Please select HR member"
            ></Select>
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

export default FormUser;

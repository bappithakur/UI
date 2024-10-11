import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { BusinessPartnerService, CoreService } from "../../../../core/services";

const FormFarmer = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.authReducer);

  const [loading, setLoading] = useState(false);
  const [optionsState, setOptionsState] = useState([]);
  const [optionsZone, setOptionsZone] = useState([]);

  const getZonesList = useCallback(async () => {
    const response = await CoreService.getZonesList(user.countryid);

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.Name,
          value: el.DdZoneId,
        };
      });

      setOptionsZone(list);
    }
  }, [user.countryid]);

  useEffect(() => {
    getZonesList();
  }, [getZonesList]);

  const onZoneChange = async (zoneId) => {
    const response = await CoreService.getStates(user.countryid, zoneId);
    form.resetFields(["ddStateId", "city", "code"]);

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.Name,
          value: el.DdStateId,
        };
      });

      setOptionsState(list);
    }
  };

  const onFinish = async (param) => {
    param.ddTimeZoneId = null;
    param.ddCurrencyId = 2;
    setLoading(true);

    const response = await BusinessPartnerService.createFarmer(param);

    if (response) {
      onClose(true);
      form.resetFields();
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ ddCountryId: user.countryid }}
      hideRequiredMark
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="cBpartnerCode"
            label="Farmer Code"
            rules={[{ required: true, message: "Please enter farmer code" }]}
          >
            <Input placeholder="Please enter farmer code" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="businessName"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Please enter name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Father's Name"
            rules={[{ required: true, message: "Please enter father's name" }]}
          >
            <Input placeholder="Please enter father's name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="contactMobile"
            label="Contact No."
            rules={[{ required: true, message: "Please enter contact number" }]}
          >
            <Input placeholder="Please enter contact number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="contactLandline"
            label="Landline No."
            rules={[{ required: true, message: "Please enter landline no" }]}
          >
            <Input placeholder="Please enter landline no" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="contactFacsimile"
            label="Contact Facsimile"
            rules={[
              { required: true, message: "Please enter contact facsimile" },
            ]}
          >
            <Input placeholder="Please enter contact facsimile" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="emailDivision"
            label="Email Division"
            rules={[{ required: true, message: "Please enter email division" }]}
          >
            <Input placeholder="Please enter email division" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="emailCorporate"
            label="Email Corporate"
            rules={[
              { required: true, message: "Please enter email corporate" },
            ]}
          >
            <Input placeholder="Please enter email corporate" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="emailContact"
            label="Email Contact"
            rules={[{ required: true, message: "Please enter email contact" }]}
          >
            <Input placeholder="Please enter email contact" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="addressLine1"
            label="Address Line 1"
            rules={[{ required: true, message: "Please enter address line 1" }]}
          >
            <Input placeholder="Please enter address line 1" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="addressLine2"
            label="Address Line 2"
            rules={[{ required: true, message: "Please enter address line 2" }]}
          >
            <Input placeholder="Please enter address line 2" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="addressLine3"
            label="Address Line 3"
            rules={[{ required: true, message: "Please enter address line 3" }]}
          >
            <Input placeholder="Please enter address line 3" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="addressLine4"
            label="Address Line 4"
            rules={[{ required: true, message: "Please enter address line 4" }]}
          >
            <Input placeholder="Please enter address line 4" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="ddCountryId" label="Country">
            <Select disabled placeholder="Please select country">
              <Select.Option value={user.countryid}>
                {user.country}
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="ddZoneId"
            label="Zone"
            rules={[{ required: true, message: "Please select a zone" }]}
          >
            <Select
              title="zone"
              onChange={onZoneChange}
              options={optionsZone}
              placeholder="Please select a zone"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="ddStateId"
            label="State/Province"
            rules={[{ required: true, message: "Please select a state" }]}
          >
            <Select
              title="state"
              options={optionsState}
              placeholder="Please select a state"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="city"
            label="City/Village"
            rules={[{ required: true, message: "Please enter city/village" }]}
          >
            <Input placeholder="Please enter city/village" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Pin code"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Input placeholder="Please Enter pincode" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="website"
            label="Website"
            rules={[{ required: true, message: "Please enter website" }]}
          >
            <Input placeholder="Please enter website" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter description",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Please enter description" />
          </Form.Item>
        </Col>
      </Row>
      <Space>
        <Button onClick={onClose}>Cancel</Button>
        <Button htmlType="submit" loading={loading} type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormFarmer;

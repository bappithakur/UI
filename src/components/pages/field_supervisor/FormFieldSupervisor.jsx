import React, { useState, useCallback, useEffect } from "react";

import { Button, Col, Form, Input, Row, Select, DatePicker } from "antd";
import { Option } from "antd/lib/mentions";
import { Utils } from "../../../core/helpers";
import { HumanResourceService } from "../../../core/services";

const FormFieldSupervisor = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [optionsSupervisor, setOptionsSupervisor] = useState([]);

  const getSupervisorList = useCallback(async () => {
    const response = await HumanResourceService.getHumanResourceMemberList();

    if (response) {
      const list = response.map((el) => {
        return {
          label: `${el.firstName} ${el.middleName} ${el.lastName}`,
          value: el.hrMemberId,
        };
      });

      setOptionsSupervisor(list);
    }
  }, []);

  useEffect(() => {
    getSupervisorList();
  }, [getSupervisorList]);

  const onFinish = async (param) => {
    param.dob = Utils.convertDateToDateTime(param.dob);
    param.passportValid = Utils.convertDateToDateTime(param.passportValid);
    param.marriageAnniversaryDate = Utils.convertDateToDateTime(
      param.marriageAnniversaryDate
    );
    param.hrDepartmentId = 1;
    param.hrDesignationId = 1;
    param.ddBpartnerId = 0;
    param.ddTenentId = 1;
    param.ddTenentEntityId = 1;

    setLoading(true);
    const response = await HumanResourceService.createSupervisor(param);

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
            name="memberCode"
            label="Code"
            rules={[{ required: true, message: "Please enter code" }]}
          >
            <Input placeholder="Please enter code" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="Please enter first name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="middleName"
            label="Middle Name"
            rules={[{ required: true, message: "Please enter middle name" }]}
          >
            <Input placeholder="Please enter middle name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input placeholder="Please enter last name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true, message: "Please choose date of birth" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="bloodGroup"
            label="Blood Group"
            rules={[{ required: true, message: "Please enter blood group" }]}
          >
            <Input placeholder="Please enter blood group" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="nationality"
            label="Nationality"
            rules={[{ required: true, message: "Please enter nationality" }]}
          >
            <Input placeholder="Please enter nationality" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="aadharNo"
            label="Aadhar No."
            rules={[{ required: true, message: "Please enter aadhar no" }]}
          >
            <Input placeholder="Please enter aadhar no" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="panNo"
            label="PAN No."
            rules={[{ required: true, message: "Please enter pan no" }]}
          >
            <Input placeholder="Please enter pan no" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="passportNo"
            label="Passport No."
            rules={[{ required: true, message: "Please enter passport no" }]}
          >
            <Input placeholder="Please enter passport no" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="passportValid"
            label="Passport Valid Till"
            rules={[
              { required: true, message: "Please choose passport valid till" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="fatherName"
            label="Father Name"
            rules={[{ required: true, message: "Please enter father name" }]}
          >
            <Input placeholder="Please enter father name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="motherName"
            label="Mother Name"
            rules={[{ required: true, message: "Please enter mother name" }]}
          >
            <Input placeholder="Please enter mother name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="spouceName"
            label="Spouse Name"
            rules={[{ required: true, message: "Please enter spouse name" }]}
          >
            <Input placeholder="Please enter spouse name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="marriageAnniversaryDate"
            label="Marriage Anniversary"
            rules={[
              { required: true, message: "Please choose marriage anniversary" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="emailOfficial"
            label="Official Email"
            rules={[{ required: true, message: "Please enter official email" }]}
          >
            <Input placeholder="Please enter official email" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="emailPersonal"
            label="Personal Email"
            rules={[{ required: true, message: "Please enter personal email" }]}
          >
            <Input placeholder="Please enter personal email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="contactOfficial"
            label="Official Contact No."
            rules={[
              { required: true, message: "Please enter official contact no" },
            ]}
          >
            <Input placeholder="Please enter official contact no" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="contactPersonal"
            label="Personal Contact No."
            rules={[
              { required: true, message: "Please enter personal contact no" },
            ]}
          >
            <Input placeholder="Please enter personal contact no" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please enter gender" }]}
          >
            <Select placeholder="Please enter gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="supervisorId"
            label="Supervisor"
            rules={[{ required: true, message: "Please select a supervisor" }]}
          >
            <Select
              title="zone"
              options={optionsSupervisor}
              placeholder="Please select a supervisor"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="addressCurrent"
            label="Current Address"
            rules={[
              { required: true, message: "Please enter current address" },
            ]}
          >
            <Input placeholder="Please enter current address" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="addressPermanent"
            label="Permanent Address"
            rules={[
              { required: true, message: "Please enter permanent address" },
            ]}
          >
            <Input placeholder="Please enter permanent address" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Button loading={loading} htmlType="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormFieldSupervisor;

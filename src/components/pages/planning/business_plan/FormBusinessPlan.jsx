import React from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { BusinessService, CoreService } from "../../../../core/services";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { Utils } from "../../../../core/helpers";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const FormBusinessPlan = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [optionsFinancialYears, setOptionsFinancialYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authReducer);

  const onFinish = async (param) => {
    setLoading(true);
    param.ppPlanId = 0;
    param.ddCountryId = user.countryid;
    param.plandate = Utils.convertDateToDateTime(param.plandate);
    param.fromDate = Utils.convertDateToDateTime(param.fromDate);
    param.toDate = Utils.convertDateToDateTime(param.toDate);
    console.log("FORM DATA: ", param);

    let response = await BusinessService.createBusinessPlanHeader(param);

    if (response) {
      onClose(true);
      form.resetFields();
      onSuccess(response);
    }

    setLoading(false);
  };

  const onFinancialYearchange = async (value) => {
    const response = await CoreService.getFinancialYearDates(value);
    const { fromDate, toDate } = response;

    let fields = form.getFieldsValue();
    fields.fromDate = Utils.formatDate(fromDate);
    fields.toDate = Utils.formatDate(toDate);
    console.log(fields);

    form.setFieldsValue(fields);
  };

  const getFinancialYearsList = useCallback(async () => {
    const response = await CoreService.getFinancialYearsList();

    const list = response.map(function (el) {
      return {
        label: el.financialYear,
        value: el.ddFinYearId,
      };
    });
    setOptionsFinancialYears(list);
  }, []);

  useEffect(() => {
    getFinancialYearsList();
  }, [getFinancialYearsList]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="ddCountryId" label="Country">
            <Select
              disabled
              defaultValue={user.countryid}
              placeholder="please select country"
            >
              <Select.Option value={user.countryid}>
                {user.country}
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="planNo"
            label="Plan No"
            rules={[{ required: true, message: "Please enter url" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="plandate"
            label="Plan Date"
            rules={[{ required: true, message: "Please choose the dateTime" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="version"
            label="Version"
            rules={[
              { required: true, message: "Please enter version" },
              {
                pattern: new RegExp("^\\d+(\\.\\d+)*$"),
                message: "Only numbers (including decimals) are allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="remarks" label="Remarks">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="ddFinYearId"
            label="Financial Year"
            rules={[{ required: true, message: "Please choose the approver" }]}
          >
            <Select
              title="financialYear"
              onChange={onFinancialYearchange}
              options={optionsFinancialYears}
              placeholder="Please select an Condition Type"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="fromDate"
            label="From Date"
            rules={[{ required: true, message: "Please choose the dateTime" }]}
          >
            <Input disabled style={{ width: "100%" }}></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="toDate"
            label="To Date"
            rules={[{ required: true, message: "Please choose the dateTime" }]}
          >
            <Input disabled style={{ width: "100%" }}></Input>
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

export default FormBusinessPlan;

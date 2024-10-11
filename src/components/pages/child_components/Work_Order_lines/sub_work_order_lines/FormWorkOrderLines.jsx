import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { useSelector } from "react-redux";
import React, { useEffect, useState, useCallback } from "react";

import {
  CoreService,
  CropService,
  LandService,
  WorkOrderService,
} from "../../../../../core/services";

const FormWorkOrderLines = (props) => {
  const [form] = Form.useForm();
  const { onClose, onSuccess, selected } = props;
  const { user } = useSelector((state) => state.authReducer);

  const [optionsZone, setOptionsZone] = useState([]);
  const [optionsState, setOptionsState] = useState([]);
  const [optionsLand, setOptionsLand] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ landRegisterationsList: [] });
  const [expectedYield, setExpectedYield] = useState(0);

  const getZonesList = useCallback(async () => {
    let response = await CoreService.getZonesList(selected.ddCountryId);
    let list = [];
    if (response) {
      list = response.map((el) => {
        return {
          label: el.Name,
          value: el.DdZoneId,
        };
      });
    }

    setOptionsZone(list);
    const zone = list.find((zone) => zone.value === selected.ddZoneId);
    form.setFieldValue("zone", zone.label);
  }, [form, selected]);

  const getStatesList = useCallback(async () => {
    let response = await CoreService.getStates(
      selected.ddCountryId,
      selected.ddZoneId
    );
    let list = [];
    if (response) {
      list = response.map((el) => {
        return {
          label: el.Name,
          value: el.DdStateId,
        };
      });
    }

    setOptionsState(list);
    const state = list.find((state) => state.value === selected.ddStateId);
    form.setFieldValue("state", state.label);
  }, [form, selected]);

  const onLandTypeChange = async () => {
    const landType = parseInt(form.getFieldValue("landType"));

    const response = await LandService.getLandRegisterationFromCZSL(
      selected.ddCountryId,
      selected.ddZoneId,
      selected.ddStateId,
      landType
    );

    let list = [];
    if (response) {
      list = response.map((el) => {
        return {
          label: el.landNumber,
          value: `${el.lnLandRegisterationId}_${el.landNumber}_${el.description}`, // keeping underscores here because landNumber has value like PB-100-1001
        };
      });
      setData((prev) => {
        return { ...prev, landRegisterationsList: response };
      });
      setOptionsLand(list);
    }
  };

  const onChangeLand = async (value) => {
    let record = data.landRegisterationsList.filter(
      (ele) => ele.lnLandRegisterationId === parseInt(value.split("_")[0])
    );
    form.setFieldValue("landArea", record[0]?.landArea ?? 0);
    let response = await CropService.getYieldFromCropVarietyState(
      selected.crCropId,
      selected.crCropVarietyId,
      selected.ddStateId
    );
    let expectedYieldTotal =
      form.getFieldValue("landArea") * (response?.yield ?? 0);
    setExpectedYield(response?.yield ?? 0);
    form.setFieldValue("landYield", expectedYieldTotal);
  };

  const onBlurLandAllocation = (e) => {
    if (e.target.value) {
      let total = expectedYield * parseInt(e.target.value);
      form.setFieldValue("landAllocationYield", total);
    }
  };
  useEffect(() => {
    getZonesList();
    getStatesList();
  }, [getZonesList, getStatesList]);

  useEffect(() => {
    form.setFieldValue("workOrderNo", selected.workOrderNo);
  }, [selected, form]);

  const onFinish = async (param) => {
    setLoading(true);

    const landData = param.landData.split("_");
    delete param.landData;
    param.woWorkOrderLineId = 0;
    param.ppPlanId = selected.ppPlanId;
    param.ppPlanLinesId = 0;
    param.ddStateId = selected.ddStateId;
    param.stdYield = expectedYield;
    param.woWorkOrderId = selected.woWorkOrderId;
    param.cContractId = 0;
    param.contractNo = "0";
    param.cContractLineId = 0;
    param.lnLandRegisterationId = parseInt(landData[0]);
    param.landNo = landData[1];
    param.description = landData[2];

    //console.log("Form Fields are : ", param);
    //console.log("Header Fields are : ", selected);
    const response = await WorkOrderService.createWorkOrderLine(param);

    if (response) {
      form.resetFields();
      onSuccess(response);
      onClose(true);
    }

    setLoading(false);
  };

  return (
    <Form
      initialValues={{
        landArea: 0,
        landYield: 0,
        landAllocation: 0,
        landAllocationYield: 0,
        expectedYield: 0,
        landExptectedYield: 0,
        planQty: selected.planQty,
      }}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      hideRequiredMark={false}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="workOrderNo" label="Work Order No">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="planQty" label="Work Order Quantity">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="Country" label="Country">
            <Select
              disabled
              defaultValue={user.countryid}
              placeholder="please select country"
            >
              <Select.Option value={selected.ddCountryId}>
                {user.country}
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="zone" label="Zone">
            <Select
              disabled
              options={optionsZone}
              placeholder="Please select Your Zone"
            ></Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="state" label="State">
            <Select
              disabled
              options={optionsState}
              placeholder="Please select Your State"
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="landType"
            label="Land Type"
            rules={[{ required: true, message: "Please select a land type" }]}
          >
            <Select
              onChange={onLandTypeChange}
              placeholder="Please Select land type"
            >
              <Select.Option value={""}>Please Select Land Type</Select.Option>
              <Select.Option value="10">Own Land</Select.Option>
              <Select.Option value="20">Contract Land</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="landData"
            label="Land"
            rules={[{ required: true, message: "Please select land" }]}
          >
            <Select
              onChange={onChangeLand}
              options={optionsLand}
              placeholder=""
            ></Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="landArea" label="Available Land Area">
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="landYield" label="Available Land Area Yield">
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="landAllocation"
            label="Land Allocation"
            rules={[{ required: true, message: "" }]}
          >
            <Input onKeyUp={onBlurLandAllocation} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="landAllocationYield"
            label="Yield From Land Allocation"
          >
            <Input disabled={true} />
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

export default FormWorkOrderLines;

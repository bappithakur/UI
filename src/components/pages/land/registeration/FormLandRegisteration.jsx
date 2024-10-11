import React, { useCallback, useState, useEffect } from "react";
import { Button, Col, Form, Row, Input, Select, Space } from "antd";
import {
  CoreService,
  LandService,
  BusinessPartnerService,
} from "../../../../core/services";
import { useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";

const FormLandRegisteration = ({ onClose, onSuccess }) => {
  const [optionsZone, setOptionsZone] = useState([]);
  const [optionsBussinesPartners, setOptionsBussinessPartners] = useState([]);

  const [optionsState, setOptionsState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideBussinesPartner, setHideBussinessPartner] = useState(true);

  const [form] = Form.useForm();
  const {
    user: { countryid, country },
  } = useSelector((state) => state.authReducer);

  const getZonesList = useCallback(async (value) => {
    let response = await CoreService.getZonesList(value);

    let list = response.map((el) => {
      return {
        label: el.Name,
        value: el.DdZoneId,
      };
    });

    setOptionsZone(list);
  }, []);

  const onZoneChange = async (zone) => {
    let response = await CoreService.getStates(countryid, zone);
    console.log("State in work", response);

    let list = response.map((el) => {
      return {
        label: el.Name,
        value: el.DdStateId,
      };
    });

    setOptionsState(list);
  };

  const getBussinessPartners = useCallback(async () => {
    let response = await BusinessPartnerService.getBusinessPartnerList(
      countryid
    );
    let list = response.map((el) => {
      return {
        label: `${el.cBpartnerCode}-${el.businessName}`,
        value: el.cBpartnerId,
      };
    });

    setOptionsBussinessPartners(list);
  }, [countryid]);

  const onLandTypeChange = (val) => {
    // 10 Means Own Land # 20 Means Contrat Land
    let isHide = true;
    if (val) {
      isHide = val === "10" ? true : false;
    }
    setHideBussinessPartner(isHide);
    form.setFieldValue(
      "bpFarmerId",
      isHide ? 0 : form.getFieldValue("bpFarmerId")
    );
    form.setFieldValue(
      "ownerName",
      isHide ? "Own Land" : form.getFieldValue("ownerName")
    );
  };

  useEffect(() => {
    getZonesList(countryid);
    getBussinessPartners();
  }, [getBussinessPartners, getZonesList, countryid]);

  const onFinish = async (param) => {
    setLoading(true);
    param.lnLandRegisterationId = 0;
    param.ddCountryId = countryid;
    param.ddZoneHubId = 0;
    param.statusId = 1;

    let response = await LandService.createLandRegisteration(param);
    if (response) {
      form.resetFields();
      onSuccess(response);
      onClose(true);
    }
    setLoading(false);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="ddCountryId" label="Country">
            <Select
              defaultValue={countryid}
              disabled
              placeholder="please select country"
            >
              <Select.Option value={countryid}>{country}</Select.Option>
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
              options={optionsZone}
              onChange={onZoneChange}
              placeholder="Please select Your Zone"
            ></Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="ddStateId"
            label="State"
            rules={[{ required: true, message: "Please choose the type" }]}
          >
            <Select
              options={optionsState}
              placeholder="Please select Your State"
            ></Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="landType" label="Land Type">
            <Select
              onChange={onLandTypeChange}
              placeholder="Please Select Land Type"
            >
              <Select.Option value={""}>Please Select Land Type</Select.Option>
              <Select.Option value="10">Own Land</Select.Option>
              <Select.Option value="20">Contract Land</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="landNumber" label="Land Number">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="landArea" label="Land Area">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="ddUomId" label="UOM">
            <Select placeholder="Please Select Land Type">
              <Select.Option value={""}>Please Select UOM</Select.Option>
              <Select.Option value="3">Hectare</Select.Option>
              <Select.Option value="4">Acre</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            hidden={hideBussinesPartner}
            name="bpFarmerId"
            label="Farmer"
          >
            <Select
              options={optionsBussinesPartners}
              placeholder="Please select Bussiness Partner"
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="ownerName" label="Owner Name">
            <Input disabled={hideBussinesPartner} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="village" label="Village">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="landMark" label="Land Mark">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="district" label="District">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="pincode" label="Pincode">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="latitude" label="Latitude">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="longitude" label="Longitude">
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
            <TextArea />
          </Form.Item>
        </Col>
      </Row>
      <Space>
        <Button onClick={onClose}>Cancel</Button>
        <Button htmlType="submit" type="primary" loading={loading}>
          Submit
        </Button>
      </Space>
    </Form>
  );
};
export default FormLandRegisteration;

import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { Button, Col, Form, Row, Select, Input } from "antd";
import { CoreService, CropService } from "../../../../core/services";

const FormCrop = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const [optionsZone, setOptionsZone] = useState([]);
  const [optionsState, setOptionsState] = useState([]);
  const [optionsCrop, setOptionsCrop] = useState([]);
  const [optionsCropVariety, setOptionsCropVariety] = useState([]);
  const [optionsUom, setOptionsUom] = useState([]);

  const {
    user: { landUom, cropUom },
  } = useSelector((state) => state.authReducer);

  const getCropsList = useCallback(async () => {
    const response = await CropService.getCropList();

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.cropName,
          value: el.crCropId,
        };
      });

      setOptionsCrop(list);
    }
  }, []);

  const onCropChange = async (crCropId) => {
    const response = await CropService.getCropVarietyList(crCropId);

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.cropVarietyName,
          value: el.crCropVarietyId,
        };
      });

      setOptionsCropVariety(list);
    }
  };

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

  const getUomList = useCallback(async () => {
    const response = await CoreService.getUomList();

    if (response) {
      const list = response.map((el) => {
        return {
          label: `${el.code} - ${el.name}`,
          value: el.ddUomId,
        };
      });

      setOptionsUom(list);
    }
  }, []);

  useEffect(() => {
    getZonesList();
    getCropsList();
    getUomList();
  }, [getZonesList, getCropsList, getUomList]);

  const onZoneChange = async (zoneId) => {
    const response = await CoreService.getStates(user.countryid, zoneId);

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
    setLoading(true);
    const response = await CropService.createCropStdYield(param);

    if (response) {
      onClose(true);
      form.resetFields();
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        qty: 0,
        ddCountryId: user.countryid,
        landRequired: 1,
        landUom: landUom,
        ddUomId: cropUom,
      }}
      onFinish={onFinish}
      hideRequiredMark
    >
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
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="crCropId"
            label="Crop"
            rules={[{ required: true, message: "Please select a crop" }]}
          >
            <Select
              title="crop"
              onChange={onCropChange}
              options={optionsCrop}
              placeholder="Please select a crop"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="crCropVarietyId"
            label="Variety"
            rules={[
              { required: true, message: "Please choose the crop variety" },
            ]}
          >
            <Select
              title="crop variety"
              options={optionsCropVariety}
              placeholder="Please select a crop variety"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="qty"
            label="Yield"
            rules={[{ required: true, message: "Please enter a yield" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="ddUomId"
            label="Uom"
            rules={[{ required: true, message: "Please select a uom" }]}
          >
            <Select
              disabled={true}
              title="uom"
              options={optionsUom}
              placeholder="Please select a uom"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="landRequired"
            label="Land Required"
            rules={[{ required: true, message: "Please enter land required" }]}
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="landUom"
            label="Land Uom"
            rules={[{ required: true, message: "Please select a land uom" }]}
          >
            <Select
              disabled={true}
              title="land uom"
              options={optionsUom}
              placeholder="Please select a land uom"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="plantDistance"
            label="Plant Distance"
            rules={[{ required: true, message: "Please enter plant distance" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="plantDistanceUom"
            label="Plant Distance Uom"
            rules={[
              { required: true, message: "Please enter plant distance uom" },
            ]}
          >
            <Select
              title="land uom"
              options={optionsUom}
              placeholder="Please select a land uom"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="rowDistance"
            label="Row Distance"
            rules={[{ required: true, message: "Please enter row distance" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="rowDistanceUom"
            label="Row Distance Uom"
            rules={[
              { required: true, message: "Please enter row distance uom" },
            ]}
          >
            <Select
              title="land uom"
              options={optionsUom}
              placeholder="Please select a land uom"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="countPerPlant"
            label="Count Per Plant"
            rules={[
              { required: true, message: "Please enter count per plant" },
            ]}
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
          <Button loading={loading} htmlType="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormCrop;

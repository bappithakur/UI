import React, { useCallback, useState, useEffect } from "react";
import { Button, Col, Form, Row, Select, Space, Input } from "antd";
import { useSelector } from "react-redux";
import { CoreService, CropService } from "../../../../../core/services";

const FormCycleArea = ({ onClose, cropCycleId, onSuccess }) => {
  const { user } = useSelector((state) => state.authReducer);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [optionsZone, setOptionsZone] = useState([]);
  const [optionsState, setOptionsState] = useState([]);
  const [optionsWeek, setOptionsWeek] = useState([]);

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

  useEffect(() => {
    const list = [];
    for (let i = 1; i <= 52; i++) {
      list.push({
        label: i,
        value: i,
      });
    }

    setOptionsWeek(list);
  }, []);

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
    param.crCropCycleId = cropCycleId;
    param.ddCountryId = user.countryid;
    setLoading(true);

    const response = CropService.createCropCycleArea(param);

    if (response) {
      onClose(true);
      form.resetFields();
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} form={form} hideRequiredMark>
      <Row gutter={16}>
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
        <Col span={12}>
          <Form.Item
            name="ddStateId"
            label="State"
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
            name="rainStartsOn"
            label="Rain Starts ON"
            rules={[
              { required: true, message: "Please select rain starts on" },
            ]}
          >
            <Select
              showSearch
              title="rain starts on"
              options={optionsWeek}
              placeholder="Please select rain starts on"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="sunshineHours"
            label="Sunshine Hours"
            rules={[{ required: true, message: "Please enter sunshine hours" }]}
          >
            <Input placeholder="Please enter sunshine hours" max={24} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="minHumidity"
            label="Min. Humidity"
            rules={[{ required: true, message: "Please enter min. humidity" }]}
          >
            <Input placeholder="Please enter min. humidity" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="maxHumidity"
            label="Max. Humidity"
            rules={[{ required: true, message: "Please enter max. humidity" }]}
          >
            <Input placeholder="Please enter max. humidity" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="minTemp"
            label="Min. Temp"
            rules={[{ required: true, message: "Please enter min. temp" }]}
          >
            <Input placeholder="Please enter min. temp" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="maxTemp"
            label="Max. Temp"
            rules={[{ required: true, message: "Please enter max. temp" }]}
          >
            <Input placeholder="Please enter max. temp" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="avgRainFall"
            label="Avg. Rain Fall"
            rules={[{ required: true, message: "Please enter avg. rain fall" }]}
          >
            <Input placeholder="Please enter avg. rain fall" />
          </Form.Item>
        </Col>
      </Row>

      <Space className="mt-3">
        <Button onClick={onClose}>Cancel</Button>
        <Button htmlType="submit" loading={loading} type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormCycleArea;

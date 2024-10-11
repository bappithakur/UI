import React, { useState, useCallback, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select, Checkbox, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useSelector } from "react-redux";
import { CropService } from "../../../../core/services";
import { SeasonService } from "../../../../core/services/SeasonService";

const FormCycle = ({ onClose, onSuccess }) => {
  const [optionsCrop, setOptionsCrop] = useState([]);
  const { user } = useSelector((state) => state.authReducer);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [optionsWeek, setOptionsWeek] = useState([]);
  const [optionsSeasons, setOptionsSeasons] = useState([]);

  const getCropList = useCallback(async () => {
    const response = await CropService.getCropListByCountryId(user.countryid);

    if (response) {
      const list = response.map((el) => {
        return {
          label: `${el.cropName} - ${el.cropVarietyName}`,
          value: `${el.crCropId}-${el.crCropVarietyId}`,
        };
      });

      setOptionsCrop(list);
    }
  }, [user.countryid]);

  const getSeasonsList = useCallback(async () => {
    const response = await SeasonService.getSeasonsList();

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.name,
          value: el.snSeasonId,
        };
      });

      setOptionsSeasons(list);
    }
  }, []);

  useEffect(() => {
    getCropList();
    getSeasonsList();
  }, [getCropList, getSeasonsList]);

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

  const calculateExpectedProfit = (e) => {
    const expectedRevenue = parseFloat(form.getFieldValue("expectedRevenue"));
    const expectedCost = parseFloat(form.getFieldValue("expectedCost"));
    let expectedProfit = expectedRevenue - expectedCost;

    form.setFieldValue("expectedProfit", expectedProfit);
  };

  const onFinish = async (param) => {
    const cropData = param.crCropId.split("-");
    param.crCropId = cropData[0];
    param.crCropVarietyId = cropData[1];

    setLoading(true);
    const response = await CropService.createCropCycle(param);

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
      onFinish={onFinish}
      initialValues={{
        ddCountryId: user.countryid,
        expectedCost: 0,
        expectedProfit: 0,
        expectedRevenue: 0,
      }}
      form={form}
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
            name="crCropId"
            label="Crop"
            rules={[{ required: true, message: "Please select a crop" }]}
          >
            <Select
              title="crop"
              placeholder="Please select a crop"
              options={optionsCrop}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="snSeasonId"
            label="Season"
            rules={[{ required: true, message: "Please select an season" }]}
          >
            <Select
              options={optionsSeasons}
              placeholder="Please select an season"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="name"
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
            name="fromWeek"
            label="From Week"
            rules={[{ required: true, message: "Please select from week" }]}
          >
            <Select
              showSearch
              title="from week"
              options={optionsWeek}
              placeholder="Please select from week"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="toWeek"
            label="To Week"
            rules={[{ required: true, message: "Please select to week" }]}
          >
            <Select
              showSearch
              title="to week"
              options={optionsWeek}
              placeholder="Please select to week"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="expectedRevenue"
            label="Potential Revenue"
            rules={[{ required: true, message: "" }]}
          >
            <Input onChange={calculateExpectedProfit} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="expectedCost"
            label="Cost"
            rules={[{ required: true, message: "" }]}
          >
            <Input onChange={calculateExpectedProfit} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="expectedProfit"
            label="Expected Profit"
            rules={[{ required: true, message: "" }]}
          >
            <Input disabled />
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
            <TextArea rows={4} placeholder="Please enter remarks" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="isNextYear" valuePropName="checked">
            <Checkbox>Is Next Year</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Space className="mt-3">
        <Button onClick={onClose}>Cancel</Button>
        <Button loading={loading} htmlType="submit" type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormCycle;

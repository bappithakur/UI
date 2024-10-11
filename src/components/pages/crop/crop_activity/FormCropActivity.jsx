import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";

import { CoreService, CropService } from "../../../../core/services";

const FormCropActivity = ({ onClose, onSuccess }) => {
  const { user } = useSelector((state) => state.authReducer);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [optionsCropClassification, setOptionsCropClassification] = useState(
    []
  );
  const [optionsCropSubClassification, setOptionsCropSubClassification] =
    useState([]);
  const [optionsCrop, setOptionsCrop] = useState([]);
  const [optionsCropVariety, setOptionsCropVariety] = useState([]);
  const [optionsCropMilestone, setOptionsCropMilestone] = useState([]);
  const [optionsActivity, setOptionsActivity] = useState([]);
  const [optionsLinkedSequence, setOptionsLinkedSequence] = useState([]);
  const [optionsUom, setOptionsUom] = useState([]);

  const getCropClassification = useCallback(async () => {
    const response = await CropService.getCropClassificationList();

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.cropClassName,
          value: el.crCropClassificationId,
        };
      });

      setOptionsCropClassification(list);
    }
  }, []);

  const getLinkedSequence = useCallback(async () => {
    const response = await CropService.getCropActivityListFromCountry(
      user.countryid
    );

    if (response) {
      const list = response.map((el) => {
        return {
          label: `${el.CrCropName} - ${el.CrActivityName} - ${el.mileStoneName}`,
          value: el.CrCropActivityId,
        };
      });

      setOptionsLinkedSequence(list);
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

  const getActivity = useCallback(async () => {
    const response = await CropService.getCropActivityList();

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.Name,
          value: el.CrActivityId,
        };
      });

      setOptionsActivity(list);
    }
  }, []);

  const onCropClassificationChange = async (classificationId) => {
    form.resetFields([
      "crCropSubClassificationId",
      "crCropId",
      "crCropVarietyId",
      "crCropMilestoneId",
    ]);

    const response = await CropService.getCropSubClassificationList(
      classificationId
    );

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.cropSubClassName,
          value: el.crCropSubClassificationId,
        };
      });

      setOptionsCropSubClassification(list);
    }
  };

  const onCropSubClassificationChange = async (subClassificationId) => {
    const classificationId = form.getFieldValue("crCropClassificationId");
    form.resetFields(["crCropId", "crCropVarietyId", "crCropMilestoneId"]);
    const response = await CropService.getCropClassAndSubClassificationList(
      classificationId,
      subClassificationId
    );

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.cropName,
          value: el.crCropId,
        };
      });

      setOptionsCrop(list);
    }
  };

  const onCropChange = async (cropId) => {
    form.resetFields(["crCropVarietyId", "crCropMilestoneId"]);
    const response = await CropService.getCropVarietyList(cropId);

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.cropVarietyName,
          value: el.crCropVarietyId,
        };
      });

      setOptionsCropVariety(list);
    }

    const milestones = await CropService.getCropMilestoneList(
      user.countryid,
      cropId
    );

    if (milestones) {
      const list = milestones.map((el) => {
        return {
          label: el.crCropMilestoneName,
          value: el.crCropMilestoneId,
        };
      });

      setOptionsCropMilestone(list);
    }
  };

  useEffect(() => {
    getCropClassification();
    getActivity();
    getLinkedSequence();
    getUomList();
  }, [getCropClassification, getActivity, getLinkedSequence, getUomList]);

  const onFinish = async (param) => {
    param.ddCountryId = user.countryid;
    setLoading(true);

    const response = await CropService.createCropActivity(param);

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
      onFinish={onFinish}
      initialValues={{ ddCountryId: user.countryid }}
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
            name="crCropClassificationId"
            label="Crop Classification"
            rules={[
              { required: true, message: "Please select crop classification" },
            ]}
          >
            <Select
              options={optionsCropClassification}
              onChange={onCropClassificationChange}
              placeholder="Please select crop classification"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="crCropSubClassificationId"
            label="Crop Sub Classification"
            rules={[
              {
                required: true,
                message: "Please select crop sub classification",
              },
            ]}
          >
            <Select
              options={optionsCropSubClassification}
              onChange={onCropSubClassificationChange}
              placeholder="Please select crop sub classification"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="crCropId"
            label="Crop"
            rules={[{ required: true, message: "Please select a crop" }]}
          >
            <Select
              options={optionsCrop}
              onChange={onCropChange}
              placeholder="Please select a crop"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="crCropVarietyId"
            label="Variety"
            rules={[{ required: true, message: "Please select crop variety" }]}
          >
            <Select
              options={optionsCropVariety}
              placeholder="Please select crop variety"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="crCropMilestoneId"
            label="Milestone"
            rules={[
              { required: true, message: "Please select crop milestone" },
            ]}
          >
            <Select
              options={optionsCropMilestone}
              placeholder="Please select crop milestone"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="seqNo"
            label="Sequence No."
            rules={[{ required: true, message: "Please enter sequence no." }]}
          >
            <Input placeholder="Please enter sequence no." />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="crActivityId"
            label="Activity"
            rules={[{ required: true, message: "Please select an activity" }]}
          >
            <Select
              options={optionsActivity}
              placeholder="Please select crop classification"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="durationCount"
            label="Activity Duration"
            rules={[
              { required: true, message: "Please enter activity duration" },
              {
                pattern: new RegExp("^\\d+(\\.\\d+)*$"),
                message: "Only numbers (including decimals) are allowed",
              },
            ]}
          >
            <Input placeholder="Please enter activity duration" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="durationType"
            label="Duration Type"
            rules={[{ required: true, message: "Please select duration type" }]}
          >
            <Select
              options={optionsUom}
              placeholder="Please select duration type"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="intervalDuration"
            label="Interval Duration"
            rules={[
              { required: true, message: "Please enter interval iuration" },
              {
                pattern: new RegExp("^\\d+(\\.\\d+)*$"),
                message: "Only numbers (including decimals) are allowed",
              },
            ]}
          >
            <Input placeholder="Please enter interval iuration" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="intervalType"
            label="Interval Type"
            rules={[{ required: true, message: "Please select interval type" }]}
          >
            <Select
              options={optionsUom}
              placeholder="Please select interval type"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="linkedSeqId"
            label="Linked Sequence"
            rules={[
              { required: true, message: "Please select linked sequence" },
            ]}
          >
            <Select
              options={optionsLinkedSequence}
              placeholder="Please select linked sequence"
            />
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
      <Space className="float-end">
        <Button onClick={onClose}>Cancel</Button>
        <Button htmlType="submit" loading={loading} type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormCropActivity;

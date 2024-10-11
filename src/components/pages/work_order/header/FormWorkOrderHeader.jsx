import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import { BusinessService, WorkOrderService } from "../../../../core/services";
import { useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { Utils } from "../../../../core/helpers";
import moment from "moment";

const FormWorkOrderHeader = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();

  const {
    user: { countryid, country },
  } = useSelector((state) => state.authReducer);

  const [optionsState, setOptionsState] = useState([]);
  const [optionsBusinessPlans, setOptionsBusinessPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionCrop, setOptionCrop] = useState([]);

  // FETCHING BUSINESS PLAN LIST
  const getBusinessPlanHeaderList = useCallback(async () => {
    let response = await BusinessService.getBusinessPlanHeaderList();

    let list = response.map((el) => {
      return {
        label: `${el.planNo} - ${el.description}`,
        value: el.ppPlanId,
      };
    });

    setOptionsBusinessPlans(list);
  }, []);

  const getBussinessStates = async (val) => {
    let response = await BusinessService.getStatesFromBussinessPlanLineList(
      val
    );

    console.log("State in work", response);
    let list = response.map((el) => {
      return {
        label: el.name,
        value: `${el.ddStateId}-${el.ddZoneId}`,
      };
    });
    setOptionsState(list);
  };

  const onFinish = async (param) => {
    setLoading(true);

    let cropData = param.cropData.split("-");
    let stateData = param.state.split("-");
    delete param.cropData;
    delete param.state;

    param.woWorkOrderId = 0;
    param.crCropId = cropData[0];
    param.ddCountryId = countryid;
    param.crCropVarietyId = cropData[1];
    param.ddStateId = stateData[0];
    param.ddZoneId = stateData[1];
    param.wodate = Utils.convertDateToDateTime(param.wodate);

    let response = await WorkOrderService.createWorkOrder(param);
    if (response) {
      form.resetFields();
      onSuccess(response);
      onClose(true);
    }

    setLoading(false);
  };

  const handleBusinessPlan = async (value) => {
    // const response = await BusinessService.getBusinessPlanLineList(value);
    const response = await BusinessService.getBussinessPlanLineWithQuantityList(
      value
    );

    if (response) {
      const list = response.map((el) => {
        return {
          label: `${el.crop} - ${el.variety}`,
          value: `${el.crCropId}-${el.crCropVarietyId}-${el.qty}-${el.ppPlanLineId}`,
        };
      });

      setOptionCrop(list);
    }
  };

  useEffect(() => {
    getBusinessPlanHeaderList();
  }, [getBusinessPlanHeaderList, countryid]);

  const onChangeCrop = async (val) => {
    //[0] = CropId, [1]=CropVarietyId,[2]=Quantity,[3]=[PlanLineId]
    let cropData = val.split("-");
    form.setFieldValue("plannedQuantity", cropData[2]);
    let planId = form.getFieldValue("ppPlanId");
    getBussinessStates(cropData[3]);
    const response = await WorkOrderService.getUtilizedWorkOrderQuantity(
      planId,
      cropData[0],
      cropData[1]
    );
    form.setFieldValue(
      "utilizedQuantity",
      response ? response.sumOfPlanQty : 0
    );
  };

  return (
    <Form
      initialValues={{
        wodate: moment(),
        planQty: 0,
        plannedQuantity: 0,
        utilizedQuantity: 0,
      }}
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="workOrderNo"
            label="Work Order No"
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="ppPlanId"
            label="Business Plan"
            rules={[{ required: true, message: "" }]}
          >
            <Select
              options={optionsBusinessPlans}
              onChange={handleBusinessPlan}
              placeholder="Please select a Business Plans"
            ></Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="wodate"
            label="Date"
            rules={[{ required: true, message: "" }]}
          >
            <DatePicker disabled="true" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
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
            name="activityStartDate"
            label="Activity Start Date"
            rules={[
              { required: true, message: "" },
              {
                validator: async (_, endDatetime) => {
                  var startDatetime = form.getFieldValue("wodate");
                  if (startDatetime != null)
                    if (endDatetime <= startDatetime) {
                      return Promise.reject("Must be greater than date.");
                    }
                },
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="cropData"
            label="Crop"
            rules={[{ required: true, message: "" }]}
          >
            <Select
              title="crop"
              options={optionCrop}
              onChange={onChangeCrop}
              placeholder="Please select an crop"
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: "" }]}
          >
            <Select
              options={optionsState}
              placeholder="Please select Your State"
            ></Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="plannedQuantity" label="Planned Quantity">
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="utilizedQuantity" label="Utilized Quantity">
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="planQty"
            label="Quantiy"
            rules={[
              { required: true, message: "" },
              {
                pattern: new RegExp("^\\d+(\\.\\d+)*$"),
                message: "Only numbers (including decimals) are allowed",
              },
              {
                validator: async (_, val) => {
                  let cropData = form.getFieldValue("cropData");
                  if (cropData) {
                    cropData = cropData.split("-");
                    const planQty = cropData[2];
                    const qty =
                      parseInt(planQty) -
                      (parseInt(form.getFieldValue("utilizedQuantity")) ?? 0);
                    let inputQuantity = form.getFieldValue("planQty") ?? 0;
                    if (
                      parseInt(inputQuantity) < 0 ||
                      parseInt(inputQuantity) > qty
                    ) {
                      return Promise.reject(
                        `Quantity cannot be less than zero or greater than ${qty}`
                      );
                    }
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "" }]}
          >
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

export default FormWorkOrderHeader;

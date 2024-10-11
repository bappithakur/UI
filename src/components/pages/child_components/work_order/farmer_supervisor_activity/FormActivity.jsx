import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { WorkOrderService } from "../../../../../core/services";

const { Option } = Select;

const FormActivity = ({ onClose, onSuccess, parent, selected, userType }) => {
  const [workOrderLines, setWorkOrderLines] = useState([]);
  // const [optionsObservation, setOptionsObservation] = useState([]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // const getActivityOptions = useCallback(async () => {
  //   const response = await WorkOrderService.getWorkOrderActivityList(
  //     parent.woWorkOrderId
  //   );

  //   if (response) {
  //     const list = response.map((el) => {
  //       return {
  //         label: el.crActivityName,
  //         // value: el.woWorkOrderActivityId,
  //         value: `${el.woWorkOrderActivityId}_${el.crCropActivityId}`,
  //       };
  //     });

  //     setOptionsActivity(list);
  //   }
  // }, [parent]);

  const getWorkOrderLines = useCallback(async () => {
    const response = await WorkOrderService.getWorkOrderLine(
      parent.woWorkOrderId
    );
    if (response) {
      const list = response.map((el) => {
        return {
          label: `${el.landNumber}-${el.landDescription}`,
          // value: el.woWorkOrderActivityId,
          value: el.woWorkOrderLineId,
        };
      });

      setWorkOrderLines(list);
    }
  }, [parent]);

  // const getObservationOptions = useCallback(async () => {
  //   const response = await WorkOrderService.getWorkOrderObservationList();

  //   if (response) {
  //     const list = response.map((el) => {
  //       return {
  //         label: el.woaObservationName,
  //         value: el.woaObservationCode,
  //       };
  //     });

  //     setOptionsObservation(list);
  //   }
  // }, []);

  // useEffect(() => {
  //   getObservationOptions();
  // }, [getObservationOptions]);

  useEffect(() => {
    getWorkOrderLines();
  }, [getWorkOrderLines]);

  const onFinish = async (param) => {
    setLoading(true);

    param.woWorkOrderActivityId = selected.woWorkOrderActivityId;
    param.crCropActivityId = selected.crCropActivityId;
    if (userType === "fa") {
      param.bpBpartnerId = 0;
      param.hrMemberId = 1;
    } else {
      param.bpBpartnerId = 1;
      param.hrMemberId = 0;
    }

    param.description = "no description";
    param.woWorkOrderId = parent.woWorkOrderId;
    param.woObservationId = 0;
    param.woWorkOrderActivityResponseId = 0;
    console.log("Form Fields : ", param);
    const response = await WorkOrderService.createWorkOrderFarmerActitvity(
      param
    );

    if (response) {
      form.resetFields();
      onSuccess(response);
      // onClose(true);
    }
    setLoading(false);
  };

  return (
    <Form
      initialValues={{
        hours: 0,
        isActive: true,
      }}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      hideRequiredMark={false}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="woWorkOrderActivityId" label="Activity">
            <Select
              disabled
              defaultValue={selected.crActivityId}
              title="activity"
              placeholder="Please choose the activity"
            >
              <Option value={selected.crActivityId}>
                {selected.crActivityName}
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="woWorkOrderLineId"
            label="Land Number"
            rules={[{ required: true, message: "" }]}
          >
            <Select
              title="work order lines"
              options={workOrderLines}
              placeholder="Please choose the work order line"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          {/* <Form.Item name="woObservationId" label="Observation">
            <Select
              title="observation"
              options={optionsObservation}
              placeholder="Please choose the observation"
            />
          </Form.Item> */}
          <Form.Item name="isActive" label="Status">
            <Select title="status" placeholder="Please select status">
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="hours"
            label="Hours"
            rules={[{ required: true, message: "" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="remarks" label="Remarks">
            <TextArea rows={4} placeholder="Please enter remarks" />
          </Form.Item>
        </Col>
      </Row>
      <Space className="pb-2 float-end">
        <Button onClick={onClose}>Cancel</Button>
        <Button loading={loading} htmlType="submit" type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormActivity;

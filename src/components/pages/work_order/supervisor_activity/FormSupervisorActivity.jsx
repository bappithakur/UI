import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";

import { WorkOrderService } from "../../../../core/services";

const FormFarmerActivity = ({ onClose, onSuccess, woWorkOrderId }) => {
  const [optionsActivity, setOptionsActivity] = useState([]);
  const [optionsObservation, setOptionsObservation] = useState([]);

  const getActivityOptions = useCallback(async () => {
    const response = await WorkOrderService.getWorkOrderActivityList(
      woWorkOrderId
    );

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.crActivityName,
          value: el.woWorkOrderActivityId,
        };
      });

      setOptionsActivity(list);
    }
  }, [woWorkOrderId]);

  const getObservationOptions = useCallback(async () => {
    const response = await WorkOrderService.getWorkOrderObservationList();

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.woaObservationName,
          value: el.woaObservationCode,
        };
      });

      setOptionsObservation(list);
    }
  }, []);

  useEffect(() => {
    getActivityOptions();
  }, [getActivityOptions, woWorkOrderId]);

  useEffect(() => {
    getObservationOptions();
  }, [getObservationOptions]);

  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="activity" label="Activity">
            <Select
              title="activity"
              options={optionsActivity}
              placeholder="Please choose the activity"
            ></Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="description" label="Observation">
            <Select
              title="observation"
              options={optionsObservation}
              placeholder="Please choose the observation"
            />
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
        <Button onClick={onClose} type="primary">
          Submit
        </Button>
      </Space>
    </Form>
  );
};

export default FormFarmerActivity;

import React, { useEffect, useCallback } from "react";
import { Button, Col, Row, Input, Form, Modal, Tabs } from "antd";

import {
  DeleteOutlined,
  ExportOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
import { useState } from "react";
import { BusinessService } from "../../../../../core/services/BusinessService";
import GridCropPlanCycle from "./../crop_cycle/Grid";

const columns = [
  {
    header: "Crop",
    defaultWidth: 140,
    name: "crop",
    editable: false,
  },
  {
    header: "Variety",
    defaultWidth: 140,
    name: "variety",
    editable: false,
  },
  {
    header: "Quantity",
    defaultWidth: 140,
    name: "qty",
  },
  {
    header: "UOM",
    defaultWidth: 140,
    name: "uom",
    editable: false,
  },
  {
    header: "Standard Yield",
    defaultWidth: 140,
    name: "standard_yield",
    render: ({ data: { stdYield, stdYieldUomName } }) => (
      <>{`${stdYield} ${stdYieldUomName}`}</>
    ),
  },

  {
    header: "Land Required",
    defaultWidth: 140,
    name: "land_required",
    editable: false,
    render: ({ data: { landRequired, landUomName } }) => (
      <>{`${landRequired} ${landUomName}`}</>
    ),
  },
  {
    header: "Net Land Required",
    defaultWidth: 140,
    name: "netLand",
    editable: false,
    render: ({ data: { netLand, landUomName } }) => (
      <>{`${netLand.toFixed(2)} ${landUomName}`}</>
    ),
  },
  {
    header: "Potential Revenue",
    defaultWidth: 140,
    name: "potentialRevenue",
    editable: false,
  },
  {
    header: "Cost",
    defaultWidth: 140,
    name: "costPrice",
    editable: false,
  },
  {
    header: "Expected Profit",
    defaultWidth: 140,
    name: "expectedProfit",
    editable: false,
  },
];

const Grid = (props) => {
  const { planId } = props;
  const [records, setRecords] = useState([]);
  const [isUpdated, setUpdated] = useState(false);
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [isModelOpen, setModelOpen] = useState(false);
  const [form] = Form.useForm();

  const [initialValues] = useState({
    costPrice: selected?.costPrice ?? 0,
    expectedProfit: selected?.expectedProfit ?? 0,
    potentialRevenue: selected?.potentialRevenue ?? 0,
  });

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [selected, initialValues, form]);

  const onSelectionChange = (e) => {
    console.log("PLAN LINE GRID ROW: ", e);
    setSelected(e);
  };

  const getGridRecords = useCallback(async () => {
    setLoading(true);

    let response = await BusinessService.getBusinessPlanLineList(planId);
    console.log({ response });

    if (response) {
      setRecords(response);
      setSelected(null);
    }

    setLoading(false);
  }, [planId]);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords, planId, isUpdated]);

  const createPlanLines = async () => {
    let response = await BusinessService.createBusinessPlanLines(planId);
    if (response) setUpdated(!isUpdated);
  };

  // const onRowDoubleClick = (response) => {
  //   setSelected(response);
  //   setModelOpen(true);
  //   console.log("row data", response);
  // };

  const onFinish = async (param) => {
    param.ppPlanLinesId = selected.ppPlanLineId;

    let response = await BusinessService.updateBusinessPlanLineCosting(param);

    if (response) {
      setUpdated(!isUpdated);
      setModelOpen(false);
      form.resetFields();
    }
  };

  const onSuccess = (result) => {
    if (result > 0) setUpdated(!isUpdated);
  };

  const calculateExpectedProfit = (e) => {
    const potentialRevenue = parseFloat(form.getFieldValue("potentialRevenue"));
    const costPrice = parseFloat(form.getFieldValue("costPrice"));
    let expectedProfit = potentialRevenue - costPrice;

    form.setFieldValue("expectedProfit", expectedProfit);
  };

  const CostModal = ({ open }) => {
    return (
      <Modal
        title="Edit Detail"
        footer={[]}
        centered
        onCancel={() => setModelOpen(false)}
        open={open}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="potentialRevenue"
                label="Potential Revenue"
                rules={[{ required: true, message: "" }]}
              >
                <Input onChange={calculateExpectedProfit} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="costPrice"
                label="Cost"
                rules={[{ required: true, message: "" }]}
              >
                <Input onChange={calculateExpectedProfit} />
              </Form.Item>
            </Col>
            <Col span={24}>
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
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={() => setModelOpen(false)} className="ms-2">
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  };

  return (
    <>
      <GridContainer>
        <CostModal open={isModelOpen}></CostModal>
        <Toolbar>
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<ExportOutlined />}
          ></Button>
          <Button
            type="dashed"
            className="float-start ms-1"
            onClick={createPlanLines}
            icon={<SyncOutlined />}
          ></Button>
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<DeleteOutlined />}
          ></Button>
        </Toolbar>
        <DataGrid
          loading={loading}
          uniqueColumn={"ppPlanLineId"}
          minHeight={"50vh"}
          onSelectionChange={onSelectionChange}
          //onRowDoubleClick={onRowDoubleClick}
          columns={columns}
          records={records}
        />
      </GridContainer>
      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Crop Plan Cycle" key="1">
            <GridCropPlanCycle
              onSuccess={onSuccess}
              planId={planId}
              planLineId={selected.ppPlanLineId}
            />
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};
export default Grid;

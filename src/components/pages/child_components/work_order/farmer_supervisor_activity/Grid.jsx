import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Tabs } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormActivity from "./FormActivity";
import GridActivityFeedback from "./../activity_feedback/Grid";

import { WorkOrderService } from "./../../../../../core/services";
import {
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Activity",
    name: "crActivityName",
    defaultWidth: 180,
  },
  {
    header: "Duration",
    defaultWidth: 120,
    name: "durationCount",
    render: ({ data: { durationCount } }) => (
      <>{`${durationCount ?? 0} Hours`}</>
    ),
  },
  {
    header: "Interval",
    defaultWidth: 120,
    name: "intervalDuration",
    render: ({ data: { intervalDuration } }) => (
      <>{`${intervalDuration ?? 0} Hours`}</>
    ),
  },

  {
    header: "Remarks",
    defaultWidth: 180,
    name: "remarks",
  },
];

const Grid = ({ parent, userType }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setUpdated] = useState(false);
  const [isModelOpen, setModelOpen] = useState(false);
  const [selected, setSelected] = useState();

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    const response = await WorkOrderService.getWorkOrderActivityList(
      parent.woWorkOrderId
    );
    console.log("Activities List : ", response);
    if (response) setRecords(response);
    setLoading(false);
  }, [parent]);

  const onSelectionChange = (e) => {
    setSelected(e);
  };

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords, parent, isUpdated]);

  const onRowDoubleClick = (response) => {
    setModelOpen(true);
    console.log("row data", response);
  };

  const onSuccess = () => {
    setUpdated(!isUpdated);
    setModelOpen(false);
  };
  return (
    <>
      <GridContainer>
        <Modal
          destroyOnClose={true}
          title="Order Activity Response"
          footer={[]}
          centered
          onCancel={() => setModelOpen(false)}
          open={isModelOpen}
        >
          <FormActivity
            userType={userType}
            parent={parent}
            selected={selected}
            onSuccess={onSuccess}
          />
        </Modal>
        <Toolbar>
          {/* <ButtonModal title="Order Activity Response">
            <FormActivity
              userType={userType}
              selected={selected}
              onSuccess={onSuccess}
            />
          </ButtonModal> */}
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<ExportOutlined />}
          />
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<DeleteOutlined />}
          />
        </Toolbar>
        <DataGrid
          uniqueColumn={"crActivityId"}
          onRowDoubleClick={onRowDoubleClick}
          onSelectionChange={onSelectionChange}
          minHeight={"50vh"}
          loading={loading}
          columns={columns}
          records={records}
        />
      </GridContainer>
      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Activity Feedback" key="1">
            <GridActivityFeedback
              refresh={isModelOpen}
              parent={selected}
            ></GridActivityFeedback>
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};

export default Grid;

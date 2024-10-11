import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import {
  DeleteOutlined,
  ExportOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
import FormWorkOrderHeader from "./FormWorkOrderHeader";
import { WorkOrderService } from "../../../../../core/services";

const columns = [
  {
    header: "Activity",
    name: "crActivityName",
    defaultWidth: 180,
  },
  {
    header: "Sequence",
    name: "seqNo",
    defaultWidth: 180,
  },
  {
    header: "Duration",
    name: "durationCount",
    defaultWidth: 180,
    render: ({ value }) => `${value} Hours`,
  },
];

const Grid = ({ workOrderId, cropId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setUpdated] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await WorkOrderService.getWorkOrderActivityList(workOrderId);
    console.log(response);

    if (response) setRecords(response);

    setLoading(false);
  }, [workOrderId]);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords, workOrderId, isUpdated]);

  const syncWorkOrderActivities = async () => {
    let response = await WorkOrderService.syncWorkOrderActivities(
      workOrderId,
      cropId
    );
    if (response) setUpdated(!isUpdated);
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Work Order Activities">
            <FormWorkOrderHeader />
          </ButtonDrawer>
          <Button
            type="dashed"
            className="float-start ms-1"
            onClick={syncWorkOrderActivities}
            icon={<SyncOutlined />}
          ></Button>
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
          uniqueColumn={"woWorkOrderActivityId"}
          minHeight={"50vh"}
          loading={loading}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};

export default Grid;

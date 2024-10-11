import React, { useCallback, useEffect, useState } from "react";

import { WorkOrderService } from "./../../../../../core/services";
import {
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
import { Tag } from "antd";
const columns = [
  {
    header: "Activity",
    name: "crActivityName",
    defaultWidth: 180,
  },
  {
    header: "Observation",
    defaultWidth: 180,
    name: "observationName",
  },
  {
    header: "Description",
    defaultWidth: 180,
    name: "description",
  },
  {
    header: "Status",
    defaultWidth: 120,
    name: "isActive",
    render: ({ data: { isActive } }) => (
      <Tag color={isActive ? "green" : "red"} key={1}>
        {isActive ? "Active" : "In Active"}
      </Tag>
    ),
  },
  {
    header: "Hours",
    defaultWidth: 120,
    name: "hours",
    render: ({ data: { hours } }) => <>{`${hours ?? 0} Hours`}</>,
  },
  {
    header: "Remarks",
    defaultWidth: 180,
    name: "remarks",
  },
];

const Grid = ({ parent, refresh }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await WorkOrderService.getWorkOrderActivitiesList(
      parent.woWorkOrderId,
      parent.userType
    );
    console.log("Activities List : ", response);
    if (response) setRecords(response);
    setLoading(false);
  }, [parent]);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords, parent, refresh]);

  return (
    <>
      <GridContainer>
        <Toolbar></Toolbar>
        <DataGrid
          uniqueColumn={"woWorkOrderActivityResponseId"}
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

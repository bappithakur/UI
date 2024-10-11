import React, { useEffect, useCallback, useState } from "react";
import { Button } from "antd";

import {
  DeleteOutlined,
  ExportOutlined,
  CloudSyncOutlined,
} from "@ant-design/icons";

import {
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
import { BusinessService } from "../../../../../core/services/BusinessService";

const columns = [
  {
    header: "Cycle",
    defaultWidth: 140,
    name: "cropCycle",
    editable: false,
  },
  {
    header: "From Week",
    defaultWidth: 140,
    name: "fromWeek",
    editable: false,
    // render: ({ data: { fromDate } }) => (
    //   <>{fromDate ? Utils.formatDate(fromDate) : "-"}</>
    // ),
  },
  {
    header: "To Week",
    defaultWidth: 140,
    name: "toWeek",
    editable: false,
    // render: ({ data: { toDate } }) => (
    //   <>{toDate ? Utils.formatDate(toDate) : "-"}</>
    // ),
  },
  {
    header: "Quantity",
    defaultWidth: 140,
    name: "qty",
    editable: true,
  },
  {
    header: "UOM",
    defaultWidth: 140,
    name: "uom",
    editable: false,
  },

  {
    header: "Cost",
    defaultWidth: 140,
    name: "cost",
    editable: false,
  },
  {
    header: "Profit",
    defaultWidth: 140,
    name: "profit",
    editable: false,
  },
  {
    header: "Revenue",
    defaultWidth: 140,
    name: "revenue",
    editable: false,
  },
];

const Grid = (props) => {
  const { planLineId, onSuccess, planId } = props;
  const [isUpdated, setUpdated] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await BusinessService.getBusinessPlanLineCycleList(
      planLineId
    );
    if (response) setRecords(response);
    setLoading(false);
  }, [planLineId]); // if userId changes, useEffect will run again

  const createPlanLines = async () => {
    let response = await BusinessService.createBusinessPlanCycles(planId);
    if (response) setUpdated(!isUpdated);
  };

  const onEditComplete = async (row) => {
    let response = await BusinessService.updateBusinessPlanCycleQuantity(
      row.ppPlanLinesCycleId,
      {
        qty: row.qty,
      }
    );
    if (response && onSuccess) {
      onSuccess(response);
    }
  };

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords, planLineId, isUpdated]);

  return (
    <>
      <GridContainer>
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
            icon={<CloudSyncOutlined />}
          ></Button>
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<DeleteOutlined />}
          ></Button>
        </Toolbar>
        <DataGrid
          loading={loading}
          editable={true}
          uniqueColumn={"ppPlanLinesCycleId"}
          onEditComplete={onEditComplete}
          minHeight={"50vh"}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

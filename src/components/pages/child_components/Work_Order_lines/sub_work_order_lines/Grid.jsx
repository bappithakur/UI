import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import FormWorkOrderLines from "./FormWorkOrderLines";

import {
  ButtonDrawer,
  GridContainer,
  Toolbar,
  DataGrid,
} from "../../../../layout/common/grid_wrapper";
import { WorkOrderService } from "../../../../../core/services";
// ../../../layout/
// import { GridWorkOrderActivities } from "../work_order_activities/Grid";

const columns = [
  {
    header: "Work Order No",
    name: "workOrderNo",
    defaultWidth: 180,
  },
  {
    header: "Land Type",
    defaultWidth: 180,
    name: "landType",
    render: ({ data: { landType } }) => <>{landType || "-"}</>,
  },
  {
    header: "Land Number",
    defaultWidth: 180,
    name: "landNumber",
  },
  {
    header: "Land Description",
    defaultWidth: 180,
    name: "landDescription",
  },
  {
    header: "Land Area",
    name: "landArea",
    defaultWidth: 180,
  },
];

const Grid = ({ selected }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    const response = await WorkOrderService.getWorkOrderLine(
      selected.woWorkOrderId
    );

    if (response) {
      setRecords(response);
    }

    setLoading(false);
  }, [selected.woWorkOrderId]);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  const onSuccess = () => {
    getGridRecords();
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Work Order Lines">
            <FormWorkOrderLines selected={selected} onSuccess={onSuccess} />
          </ButtonDrawer>
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<ExportOutlined />}
          ></Button>
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<DeleteOutlined />}
          ></Button>
        </Toolbar>
        <DataGrid
          uniqueColumn={"woWorkOrderLineId"}
          minHeight={"50vh"}
          columns={columns}
          records={records}
          loading={loading}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

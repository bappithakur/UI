import { Button, Tabs } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import { Utils } from "../../../../core/helpers";
import GridLandPlanning from "../../child_components/planning/land/Grid";
import { BusinessService } from "../../../../core/services/BusinessService";
import {
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Plan No",
    defaultWidth: 140,
    name: "planNo",
  },
  {
    header: "Plan Date",
    defaultWidth: 140,
    name: "planDate",
    render: ({ data: { planDate } }) => (
      <>{Utils.formatDate(planDate) || "-"}</>
    ),
  },
  {
    header: "Description",
    defaultWidth: 140,
    name: "description",
    render: ({ data: { description } }) => <>{description || "-"}</>,
  },
  {
    header: "Remarks",
    defaultWidth: 140,
    name: "remarks",
    render: ({ data: { remarks } }) => <>{remarks || "-"}</>,
  },
  {
    header: "Version",
    defaultWidth: 140,
    name: "version",
  },
  {
    header: "From Date",
    defaultWidth: 140,
    name: "fromDate",
    render: ({ data: { fromDate } }) => (
      <>{Utils.formatDate(fromDate) || "-"}</>
    ),
  },
  {
    header: "To Date",
    defaultWidth: 140,
    name: "toDate",
    render: ({ data: { toDate } }) => <>{Utils.formatDate(toDate) || "-"}</>,
  },
];

const Grid = () => {
  const [selected, setSelected] = useState();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectionChange = (e) => {
    setSelected(e);
  };

  const getGridRecords = useCallback(async () => {
    setLoading(true);

    const response = await BusinessService.getBusinessPlanHeaderList({
      limit: 10,
      page: 1,
    });

    if (response) setRecords(response);

    setLoading(false);
  }, []);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  return (
    <>
      <GridContainer>
        <Toolbar>
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
          uniqueColumn={"ppPlanId"}
          minHeight={"50vh"}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
          loading={loading}
        />
      </GridContainer>
      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Plan Lines" key="1">
            <GridLandPlanning planId={selected.ppPlanId} />
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};
export default Grid;

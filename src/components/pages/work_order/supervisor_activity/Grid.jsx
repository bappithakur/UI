import { Button } from "antd";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import { WorkOrderService } from "../../../../core/services";
import ActivityGrid from "../../child_components/work_order/farmer_supervisor_activity/Grid";
import {
  GridContainer,
  Toolbar,
  DataGrid,
} from "../../../layout/common/grid_wrapper";
import { Utils } from "../../../../core/helpers";

const columns = [
  {
    header: "Work Order No",
    name: "workOrderNo",
  },
  {
    header: "Work Date",
    name: "woDate",
    render: ({ data: { woDate } }) => (
      <>{woDate ? Utils.formatDate(woDate) : "-"}</>
    ),
  },
  {
    header: "Plan No",
    name: "planNo",
    render: ({ data: { planNo } }) => <>{planNo || "-"}</>,
  },
  {
    header: "Plan Description",
    name: "planDescription",
    render: ({ data: { planDescription } }) => <>{planDescription || "-"}</>,
  },
  {
    header: "Country",
    name: "countryName",
    render: ({ data: { countryName } }) => <>{countryName || "-"}</>,
  },
  {
    header: "Zone",
    name: "zoneName",
    render: ({ data: { zoneName } }) => <>{zoneName || "-"}</>,
  },
  {
    header: "State",
    name: "stateName",
    render: ({ data: { stateName } }) => <>{stateName || "-"}</>,
  },
  // {
  //   header: "Classification",
  //   name: "classificationName",
  //   render: ({ data: { classificationName } }) => (
  //     <>{classificationName || "-"}</>
  //   ),
  // },
  // {
  //   header: "Sub Classification",
  //   name: "subClassification",
  //   render: ({ data: { subClassification } }) => (
  //     <>{subClassification || "-"}</>
  //   ),
  // },

  {
    header: "Crop",
    name: "cropName",
    render: ({ data: { cropName } }) => <>{cropName || "-"}</>,
  },
  {
    header: "Crop Variety",
    name: "cropVarietyName",
    render: ({ data: { cropVarietyName } }) => <>{cropVarietyName || "-"}</>,
  },
  {
    header: "Plan Qty.",
    name: "planQty",
  },
  {
    header: "Description",
    name: "woDescription",
    render: ({ data: { woDescription } }) => <>{woDescription || "-"}</>,
  },
  {
    header: "Remarks",
    name: "woRemarks",
    render: ({ data: { woRemarks } }) => <>{woRemarks || "-"}</>,
  },
];

const Grid = () => {
  const [selected, setSelected] = useState();
  const [records, setRecords] = useState([]);
  const { user } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);

  const onSelectionChange = (e) => {
    setSelected(e);
  };

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await WorkOrderService.getWorkOrdersList(user.countryid);
    console.log(response);
    if (response) setRecords(response);
    setLoading(false);
  }, [user.countryid]);

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
          ></Button>
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<DeleteOutlined />}
          ></Button>
        </Toolbar>
        <DataGrid
          uniqueColumn={"woWorkOrderId"}
          minHeight={"50vh"}
          loading={loading}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
      {selected ? (
        <ActivityGrid
          workOrderId={selected.woWorkOrderId}
          userType="sa"
        ></ActivityGrid>
      ) : null}
    </>
  );
};
export default Grid;

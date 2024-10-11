import React, { useState } from "react";
import { Button, Tabs } from "antd";

import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import FormPlaning from "./FormPlanning";
import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Country",
    defaultWidth: 180,
    name: "country",
  },
  {
    header: "Business Plan No",
    defaultWidth: 180,
    name: "businessplanno",
  },
  {
    header: "Planing Version",
    name: "planingversion",
    defaultWidth: 180,
  },
  {
    header: "Planning Date",
    name: "planningdate",
    defaultWidth: 180,
  },
  {
    header: "Planned By",
    name: "plannedby",
    defaultWidth: 180,
  },
  {
    header: "Financial Year",
    name: "financialyear",
    defaultWidth: 180,
  },
  {
    header: "Remarks",
    name: "remarks",
    defaultWidth: 180,
  },
  {
    header: "Own Land",
    name: "action",
    defaultWidth: 180,
  },
  {
    header: "Contract Land",
    name: "action",
    defaultWidth: 180,
  },
  {
    header: "Procure",
    name: "action",
    defaultWidth: 180,
  },
];

const records = [
  {
    id: "1",
    country: "India",
    businessplanno: "123456",
    contractType: "Long Term",
    planningdate: "12/03/2022",
    planingversion: "2.4",
    vaildTill: "12/04/2023",
    plannedby: "merino services",
    financialyear: "12/03/2022",
    state: "Punjab",
    remarks: "ddafdsfd",
    landType: "Contract",
    zone: "North",
    lattiude: "",
    logitude: "",
    landNo: "INLN0001",
    landUom: "Acre",
    landArea: "7500",
  },
  {
    id: "2",
    country: "USA",
    businessplanno: "3487",
    contractType: "5years",
    planningdate: "18/05/2022",
    planingversion: "3.5",
    vaildTill: "19/09/2023",
    plannedby: "Raju services",
    financialyear: "10/03/2022",
    state: "AndharaPradesh",
    remarks: "Very good",
    landType: "Contract",
    zone: "North",
    lattiude: "mis",
    logitude: "long",
    landNo: "INL0098",
    landUom: "Acre",
    landArea: "566",
  },
];
const Grid = (props) => {
  const [selected, setSelected] = useState(null);
  const onSelectionChange = (e) => {
    setSelected(e);
  };
  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Business Requirement">
            <FormPlaning />
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
          minHeight={"50vh"}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Requirement Lines" key="1"></Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};
export default Grid;

import React, { useRef, useState } from "react";
import { Table, Button, Drawer, Select } from "antd";

import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import FormSubInsect from "./FormSubInsect";
import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Country",
    defaultWidth: 180,
    name: "country",
  },
  {
    header: "Crop",
    name: "crop",
    defaultWidth: 180,
  },
  {
    header: "Varity",
    name: "varity",
    defaultWidth: 180,
  },
  {
    header: " Gener",
    name: "gener",
    defaultWidth: 180,
  },
  {
    header: "Disease",
    name: "disease",
    defaultWidth: 180,
  },
  {
    header: "State",
    name: "state",
    defaultWidth: 180,
  },
  {
    header: "Cost Comp",
    name: "costcomp",
    defaultWidth: 180,
  },
  {
    header: "Qty",
    name: "qty",
    defaultWidth: 180,
  },
  {
    header: "U",
    name: "costcomp",
    defaultWidth: 180,
  },
  {
    header: "Cost(per year)",
    name: "costcomp",
    defaultWidth: 180,
  },
  {
    header: "Cure",
    name: "cure",
    defaultWidth: 180,
  },
];
const records = [
  {
    id: "1",
    country: "India",
    crop: "Potato",
    conditionType: "Climate",
    condition: "Moisture",
    from: "42",
    to: "46",
    uom: "c",
  },
  {
    id: "2",
    country: "India",
    crop: "Potato",
    conditionType: "Climate",
    condition: "Moisture",
    from: "42",
    to: "46",
    uom: "c",
  },
  {
    id: "3",
    country: "India",
    crop: "Potato",
    conditionType: "Climate",
    condition: "Moisture",
    from: "42",
    to: "46",
    uom: "c",
  },
];
const Grid = (props) => {
  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Create Account">
            <FormSubInsect></FormSubInsect>
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
          //onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};

export default Grid;

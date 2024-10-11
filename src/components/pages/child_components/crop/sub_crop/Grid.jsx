import React from "react";
import { Button } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
import FormSubCrop from "./FormSubCrop";

const Grid = (props) => {
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
      header: "Condition Type",
      name: "conditionType",
      defaultWidth: 180,
    },
    {
      header: " Condition",
      name: "condition",
      defaultWidth: 180,
    },
    {
      header: "Form",
      name: "from",
      defaultWidth: 180,
    },
    {
      header: "To",
      name: "to",
      defaultWidth: 180,
    },
    {
      header: "Uom",
      name: "uom",
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

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Best Suited Condition">
            <FormSubCrop></FormSubCrop>
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

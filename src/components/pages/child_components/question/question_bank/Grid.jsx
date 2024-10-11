import React from "react";
import { Button } from "antd";

import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
import FormQuestion from "./FormQuestion";
import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";

const Grid = (props) => {
  const columns = [
    {
      header: "BPC Code",
      name: "bpcCode",
      defaultWidth: 180,
    },
    {
      header: "Suplier Type",
      name: "suplierType",
      defaultWidth: 180,
    },
    {
      header: "Name",
      name: "name",
      defaultWidth: 180,
    },
    {
      header: "Father Name",
      name: "fatherName",
      defaultWidth: 180,
    },
    {
      header: "Mobile",
      name: "mobile",
      defaultWidth: 180,
    },
    {
      header: "Email",
      name: "email",
      defaultWidth: 180,
    },
    {
      header: "Village",
      name: "village",
      defaultWidth: 180,
    },
    {
      header: "District",
      name: "district",
      defaultWidth: 180,
    },
    {
      header: "State",
      name: "state",
      defaultWidth: 180,
    },
    {
      header: "Pin Code",
      name: "pincode",
      defaultWidth: 180,
    },
    {
      header: "Country",
      defaultWidth: 180,
      name: "country",
    },
    {
      header: "Status",
      defaultWidth: 180,
      name: "status",
    },
  ];
  const records = [
    {
      id: "1",
      name: "John Brown",
      bpcCode: 32,
      state: "New York No. 1 Lake Park",
      pincode: "524421",
      country: "USA",
      status: "active",
      suplierType: "sumsui",
      district: "newYork",
      village: "jemni",
      email: "jhon@merinoservices.com",
      mobile: "9989102724",
      fatherName: "jhon",
    },
  ];

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Question">
            <FormQuestion></FormQuestion>
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

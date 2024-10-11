import React from "react";
import FormSubContract from "./FormSubContract";

import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
const Grid = (props) => {
  const columns = [
    {
      header: "Status",
      name: "status",
      defaultWidth: 180,
    },
    {
      header: "Country",
      name: "country",
      defaultWidth: 180,
    },
    {
      header: "Zone",
      defaultWidth: 180,
      name: "zone",
    },
    {
      header: "State",
      defaultWidth: 180,
      name: "state",
    },
    {
      header: " Land No",
      name: "landNo",
      defaultWidth: 180,
    },
    {
      header: "Description",
      name: "description",
      defaultWidth: 180,
    },
    {
      header: "Land Type",
      name: "landType",
      defaultWidth: 180,
    },
    {
      header: "Land Area",
      name: "landArea",
      defaultWidth: 180,
      defaultFlex: 6,
    },
    {
      header: "Land UOM",
      name: "landUom",
      defaultWidth: 180,
    },
    {
      header: "Valid Till",
      name: "vaildTill",
      defaultWidth: 180,
    },
    {
      header: "Logitude",
      name: "logitude",
      defaultWidth: 180,
    },
    {
      header: "Lattiude",
      name: "lattiude",
      defaultWidth: 180,
    },
  ];
  const records = [
    {
      id: "1",
      country: "India",
      state: "Punjab",
      description: "ddafdsfd",
      landType: "Contract",
      zone: "North",
      lattiude: "",
      logitude: "",
      landNo: "INLN0001",
      vaildTill: "08/07/2020",
      landUom: "Acre",
      landArea: "7500",
      status: "Approved",
    },
    {
      id: "2",
      country: "India",
      state: "Tamilanadu",
      description: "sadsadsadf",
      landType: "Contract",
      zone: "South",
      lattiude: "",
      logitude: "",
      landNo: "INLN0002",
      vaildTill: "12/09/2022",
      landUom: "Acre",
      landArea: "25000",
      status: "Reject",
    },
    {
      id: "3",
      country: "India",
      state: "Gujrath",
      description: "fdsafds",
      landType: "Contract",
      zone: "West",
      lattiude: "",
      logitude: "",
      landNo: "INLN0003",
      vaildTill: "10/05/2021",
      landUom: "Acre",
      landArea: "15000",
      status: "Hold",
    },
  ];

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer icon={false} title="Contract Line">
            <FormSubContract></FormSubContract>
          </ButtonDrawer>

          {/* <Button
            type="dashed"
            className="float-start ms-1"
            icon={<ExportOutlined />}
          ></Button>
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<DeleteOutlined />}
          ></Button> */}
        </Toolbar>

        <DataGrid
          // onSelectionChange={onSelectionChange}
          minHeight={"50vh"}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};

export default Grid;

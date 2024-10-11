import React from "react";
import { Button } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../layout/common/grid_wrapper";
import FormCountrySeason from "./FormCountrySeason";

const columns = [
  {
    header: "Season",
    defaultWidth: 180,
    name: "seasonCode",
  },
  {
    header: "Country",
    defaultWidth: 180,
    name: "countryCode",
  },

  {
    header: "Week from",
    defaultWidth: 180,
    name: "weekfrom",
  },
  {
    header: "Week To",
    defaultWidth: 180,
    name: "weekTo",
  },
  {
    header: "Is Next Year",
    defaultWidth: 180,
    name: "isNextYear",
  },
];
const records = [
  {
    id: "1",
    countryCode: "IN",
    seasonCode: "Winter",
    weekfrom: "",
    weekTo: "",
    isNextYear: "",
  },

  {
    id: "2",
    countryCode: "IN",
    seasonCode: "Summer",
    weekfrom: "",
    weekTo: "",
    isNextYear: "",
  },
  {
    id: "3",
    countryCode: "IN",
    seasonCode: "Spring",
    weekfrom: "",
    weekTo: "",
    isNextYear: "",
  },
  {
    id: "4",
    countryCode: "IN",
    seasonCode: "Monsoon",
    weekfrom: "",
    weekTo: "",
    isNextYear: "",
  },
  {
    id: "5",
    countryCode: "IN",
    seasonCode: "Autumn",
    weekfrom: "",
    weekTo: "",
    isNextYear: "",
  },
  {
    id: "6",
    countryCode: "IN",
    seasonCode: "Pre-Winter",
    weekfrom: "",
    weekTo: "",
    isNextYear: "",
  },
];
const Grid = () => {
  const onSelectionChange = (e) => {};
  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonModal title="Season Country">
            <FormCountrySeason></FormCountrySeason>
          </ButtonModal>
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
          minHeight={"80vh"}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
      {/* {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Crop Details" key="1">
            <GridSeasonDetail></GridSeasonDetail>
          </Tabs.TabPane>
        </Tabs>
      ) : null} */}
    </>
  );
};
export default Grid;

import React, { useState } from "react";
import { Button, Tabs } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import FormFarmerDuties from "./FarmerDuties";

import {
  ButtonModal,
  GridContainer,
  Toolbar,
  DataGrid,
} from "../../layout/common/grid_wrapper";
import { GridSupervisorDuties } from "../child_components/supervisor_duties";

const columns = [
  {
    header: "Zone",
    name: "zone",
    defaultWidth: 180,
  },
  {
    header: "state",
    defaultWidth: 180,
    name: "state",
  },
  {
    header: "Land No",
    defaultWidth: 180,
    name: "landNo",
  },
  {
    header: "Description",
    defaultWidth: 180,
    name: "description",
  },
  {
    header: "Add Supervisor",
    defaultWidth: 180,
    name: "addSupervisor",
  },
];

const records = [
  {
    id: "1",
    zone: "india",
    cropsubclassfication: "001",
    landNo: "ap123456",
    state: "Ap",
    description: "land is used for forming",
    addSupervisor: "Add Supervisor",
  },
  {
    id: "2",
    zone: "USA",
    landNo: "Tn123456",
    state: "TN",
    description: "land is used for lemon farming",
    addSupervisor: "Add Supervisor",
  },
  {
    id: "3",
    zone: "UK",
    landNo: "Tn08623",
    state: "RP",
    description: "land is used for lemon farming",
    addSupervisor: "Add Supervisor",
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
          <ButtonModal title="Supervisor Duties">
            <FormFarmerDuties></FormFarmerDuties>
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
          minHeight={"50vh"}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Add Supervisor" key="1">
            <GridSupervisorDuties />
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};
export default Grid;

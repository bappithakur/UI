import React, { useState } from "react";
import { Button, Tabs } from "antd";

import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import FormQuestionaire from "./FormQuestionaire";
import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../layout/common/grid_wrapper";
import { GridChildQuestion } from "../child_components/question";

const columns = [
  {
    header: "Name",
    name: "name",
    key: "name",
  },
  {
    header: "Is Active",
    name: "isActive",
    key: "isActive",
  },
  {
    header: "Description",
    name: "description",
    key: "description",
  },
  {
    header: "Action",
    key: "action",
    name: "action",
  },
];

const records = [
  {
    id: 1,
    name: "Summer Test",
    isActive: "Yes",
    description:
      "Summer is the hottest of the four temperate seasons, occurring after spring and before autumn.",
  },
  {
    id: 2,
    name: "Monsoon Test",
    isActive: "No",
    description:
      "A monsoon is a seasonal change in the direction of the prevailing, or strongest, winds of a region.",
  },
  {
    id: 3,
    name: "Winter Test",
    isActive: "Yes",
    description:
      "Winter, the coldest season of the year, comes between autumn and spring.",
  },
];
const Grid = () => {
  const [selected, setSelected] = useState(null);
  const onSelectionChange = (e) => {
    setSelected(e);
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonModal title="Create Account">
            <FormQuestionaire></FormQuestionaire>
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
          <Tabs.TabPane tab="Questions" key="1">
            <GridChildQuestion></GridChildQuestion>
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};

export default Grid;

import React from "react";
import { Button } from "antd";

import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import FormSeasonDetail from "./FormSeasonDetail";
import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";

const Grid = (props) => {
  const columns = [
    {
      header: "Crop",
      name: "crop",
      defaultWidth: 180,
    },
  ];
  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonModal title="Crop Detail">
            <FormSeasonDetail></FormSeasonDetail>
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
          // onSelectionChange={onSelectionChange}
          minHeight={"50vh"}
          columns={columns}
          records={{}}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

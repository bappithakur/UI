import { Button, Tabs } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormLandData from "./FormLandData";
import { Utils } from "../../../../core/helpers/Utils";
import { GridSubCrop } from "../../child_components/crop";
import { BusinessService } from "../../../../core/services/BusinessService";
import {
  DataGrid,
  GridContainer,
  Toolbar,
  ButtonDrawer,
} from "../../../layout/common/grid_wrapper";

const Grid = () => {
  const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState([]);
  const planId = 1;
  
  const getGridRecords = useCallback(async () => {
    let response = await BusinessService.getBusinessPlanLineList(planId);
    console.log("first", response);

    if (response) {
      setRecords(response);
    }
  }, [planId]);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords, planId]);

  const onSelectionChange = (e) => {
    setSelected(e);
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Land Data">
            <FormLandData />
          </ButtonDrawer>
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<ExportOutlined />}
          />
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<DeleteOutlined />}
          />
        </Toolbar>
        <DataGrid
          minHeight={"55vh"}
          onSelectionChange={onSelectionChange}
          columns={Utils.createColumn(records)}
          records={records}
        />
      </GridContainer>
      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Best Suited Conditions" key="1">
            <GridSubCrop />
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};
export default Grid;

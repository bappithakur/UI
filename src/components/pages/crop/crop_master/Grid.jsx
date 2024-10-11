import { Button, Tabs } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormCrop from "./FormCrop";
import {
  CropVariety,
  GridSubCrop,
  Milestone,
} from "../../child_components/crop";
import { CropService } from "../../../../core/services/CropService";
import {
  DataGrid,
  GridContainer,
  Toolbar,
  ButtonDrawer,
} from "../../../layout/common/grid_wrapper";

const column = [
  {
    key: "cropClassificationName",
    name: "cropClassificationName",
    header: "Classification",
  },
  {
    key: "cropSubClassificationName",
    name: "cropSubClassificationName",
    header: "Sub Classification",
  },
  {
    key: "cropName",
    name: "cropName",
    header: "Crop",
  },
];

const Grid = () => {
  const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await CropService.getCropList();

    if (response) setRecords(response);

    setLoading(false);
  }, []);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  const onSuccess = () => {
    getGridRecords();
  };

  const onSelectionChange = (e) => {
    setSelected(e);
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Crop Master">
            <FormCrop onSuccess={onSuccess} />
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
          loading={loading}
          uniqueColumn={"crCropId"}
          onSelectionChange={onSelectionChange}
          columns={column}
          records={records}
        />
      </GridContainer>

      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Crop Variety" key="1">
            <CropVariety cropId={selected.crCropId} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Milestone" key="2">
            <Milestone cropId={selected.crCropId} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Best Suited Conditions" key="3">
            <GridSubCrop />
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};

export default Grid;

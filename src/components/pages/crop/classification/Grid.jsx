import { Button, Tabs } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormClassification from "./FormClassification";
import { CropService } from "../../../../core/services";
import { GridSubClassficaiton } from "../../child_components/crop";
import {
  DataGrid,
  GridContainer,
  Toolbar,
  ButtonModal,
} from "../../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Name",
    name: "cropName",
    key: "name",
  },
];

const Grid = () => {
  const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectionChange = async (e) => {
    setSelected(e);
  };

  const getCropClassfication = useCallback(async () => {
    setLoading(true);
    let response = await CropService.getCropClassificationList();

    let list = response.map(function (el, index) {
      return {
        id: index,
        cropName: el.cropClassName,
        cropId: el.crCropClassificationId,
      };
    });

    // SETTING COUNTRIES LIST STATE
    setRecords(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    getCropClassfication();
  }, [getCropClassfication]);

  const onSuccess = () => {
    getCropClassfication();
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonModal title="Crop Classification">
            <FormClassification onSuccess={onSuccess} />
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
          loading={loading}
          minHeight={"55vh"}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Sub Classifications" key="1">
            <GridSubClassficaiton cropData={selected} />
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};
export default Grid;

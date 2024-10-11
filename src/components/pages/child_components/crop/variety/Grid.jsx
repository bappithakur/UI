import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";

import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormVariety from "./FormVariety";
import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
import { CropService } from "../../../../../core/services/CropService";

const columns = [
  {
    header: "Variety",
    defaultWidth: 180,
    name: "cropVarietyName",
  },
];

const Grid = ({ cropId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await CropService.getCropVarietyList(cropId);

    if (response) setRecords(response);

    setLoading(false);
  }, [cropId]);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords, cropId]);

  const onSuccess = () => {
    getGridRecords();
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonModal title="Variety">
            <FormVariety onSuccess={onSuccess} cropId={cropId} />
          </ButtonModal>
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
          loading={loading}
          uniqueColumn={"crCropVarietyId"}
          minHeight={"55vh"}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

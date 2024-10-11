import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormActivity from "./FormActivity";
import { CropService } from "../../../../core/services/CropService";
import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Name",
    name: "Name",
    defaultWidth: 300,
  },
  {
    header: "Description",
    name: "Description",
    render: ({ data: { Description } }) => <>{Description || "-"}</>,
  },
];

const Grid = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    const response = await CropService.getCropActivityList();

    if (response) setRecords(response);

    setLoading(false);
  }, []);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  const onSuccess = () => {
    getGridRecords();
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonModal title="Activity">
            <FormActivity onSuccess={onSuccess} />
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
          minHeight={"75vh"}
          uniqueColumn={"CrActivityId"}
          columns={columns}
          records={records}
          loading={loading}
        />
      </GridContainer>
    </>
  );
};

export default Grid;

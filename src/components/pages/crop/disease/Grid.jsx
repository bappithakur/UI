import { Button, Space, Switch } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormDisease from "./FormDisease";
import { NaturalAspectService } from "../../../../core/services/NaturalAspectService";
import {
  DataGrid,
  GridContainer,
  Toolbar,
  ButtonModal,
} from "../../../layout/common/grid_wrapper";

const columns = [
  {
    name: "Name",
    header: "Disease",
    render: ({ data: { Name } }) => <>{Name || "-"}</>,
  },
  {
    name: "Remarks",
    header: "Remarks",
    render: ({ data: { Remarks } }) => <>{Remarks || "-"}</>,
  },
  {
    name: "Description",
    header: "Description",
    render: ({ data: { Description } }) => <>{Description || "-"}</>,
  },
  {
    name: "IsActive",
    header: "IsActive",
    render: ({ data: { IsActive } }) => (
      <Space size="middle">
        <Switch
          checkedChildren={IsActive ? "Active" : "Inactive"}
          unCheckedChildren="Inactive"
          defaultChecked
        />
      </Space>
    ),
  },
];

const Grid = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await NaturalAspectService.getDiseaseList();

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
          <ButtonModal title="Disease">
            <FormDisease onSuccess={onSuccess} />
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
          records={records}
          columns={columns}
          loading={loading}
          uniqueColumn={"NaDiseaseId"}
        />
      </GridContainer>
    </>
  );
};

export default Grid;

import { Button, Space, Switch } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormInsect from "./FormInsect";
import { NaturalAspectService } from "../../../../core/services/NaturalAspectService";
import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../layout/common/grid_wrapper";

const columns = [
  {
    name: "Name",
    header: "Insect",
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
    let response = await NaturalAspectService.getInsectList();
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
          <ButtonModal title="Insects">
            <FormInsect onSuccess={onSuccess} />
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
          // onSelectionChange={onSelectionChange}
          minHeight={"75vh"}
          records={records}
          columns={columns}
          loading={loading}
          uniqueColumn={"NaInsectId"}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

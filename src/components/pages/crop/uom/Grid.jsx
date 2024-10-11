import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormUom from "./FormUom";
import {
  DataGrid,
  GridContainer,
  Toolbar,
  ButtonDrawer,
} from "../../../layout/common/grid_wrapper";
import { CoreService } from "../../../../core/services";

const columns = [
  {
    name: "code",
    header: "Code",
    render: ({ data: { code } }) => <>{code || "-"}</>,
  },
  {
    name: "name",
    header: "Name",
    render: ({ data: { name } }) => <>{name || "-"}</>,
  },
  {
    name: "type",
    header: "Type",
    render: ({ data: { type } }) => <>{type || "-"}</>,
  },
  {
    name: "remarks",
    header: "Remarks",
    render: ({ data: { remarks } }) => <>{remarks || "-"}</>,
  },
];

const Grid = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await CoreService.getUomList();

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
          <ButtonDrawer title="Create UOM">
            <FormUom onSuccess={onSuccess} />
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
          minHeight={"75vh"}
          records={records}
          columns={columns}
          loading={loading}
          uniqueColumn={"ddUomId"}
        />
      </GridContainer>
    </>
  );
};

export default Grid;

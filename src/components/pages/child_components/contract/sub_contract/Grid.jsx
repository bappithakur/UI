import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import { ContactService } from "../../../../../core/services/ContractService";
import {
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Land Number",
    name: "landNumber",
    defaultWidth: 180,
  },
  {
    header: "Contract Rate",
    name: "ratePerUnit",
    defaultWidth: 180,
  },
  {
    header: "Uom",
    name: "uomName",
    defaultWidth: 180,
  },
];

const Grid = ({ contractId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    const response = await ContactService.getContractLineList(contractId);
    console.log("first", response);

    if (response) {
      setRecords(response);
    }

    setLoading(false);
  }, [contractId]);

  useEffect(() => {
    console.log("contractId", contractId);
    getGridRecords();
  }, [getGridRecords, contractId]);

  return (
    <>
      <GridContainer>
        <Toolbar>
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
          uniqueColumn={"cnContractLinesId"}
          minHeight={"50vh"}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};

export default Grid;

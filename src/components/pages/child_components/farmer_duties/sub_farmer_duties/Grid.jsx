import React, { useState, useCallback, useEffect } from "react";
import { Button } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import FormSubDuties from "./FormSubDuties";

import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
import { LandService } from "../../../../../core/services";

const columns = [
  {
    header: "Code",
    name: "bpPartnerCode",
    defaultWidth: 180,
  },
  {
    header: "Name",
    defaultWidth: 180,
    name: "bpBusinessName",
  },
  {
    header: "Contact",
    defaultWidth: 180,
    name: "bpMobileNumber",
  },
];
const Grid = (props) => {
  const { header } = props;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await LandService.getFarmerDutiesList(
      header.lnLandRegisterationId
    );
    if (response) setRecords(response);
    setLoading(false);
  }, [header]);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords, header]);

  const onSuccess = () => {
    getGridRecords();
  };

  const onSelectionChange = (e) => {};
  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Add Farmer">
            <FormSubDuties header={header} onSuccess={onSuccess} />
          </ButtonDrawer>
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
          uniqueColumn={"lnLandAssignmentsId"}
          loading={loading}
          onSelectionChange={onSelectionChange}
          minHeight={"50vh"}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};

export default Grid;

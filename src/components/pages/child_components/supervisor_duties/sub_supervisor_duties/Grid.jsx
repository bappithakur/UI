import React, { useState, useCallback, useEffect } from "react";
import { Button } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import FormSupervisorDuties from "./FormSupervisorDuties";

import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
import { LandService } from "../../../../../core/services";

const columns = [
  {
    header: "Code",
    name: "hrMemberCode",
    defaultWidth: 180,
  },
  {
    header: "Name",
    name: "hrName",
    defaultWidth: 180,
  },
  {
    header: "Contact",
    defaultWidth: 180,
    name: "hrMobileNumber",
  },
];

const Grid = (props) => {
  const { header } = props;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    const response = await LandService.getSupervisorDutiesList(
      header.lnLandRegisterationId
    );
    if (response) {
      setRecords(response);
    }
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
          <ButtonModal title="Add Supervisor">
            <FormSupervisorDuties header={header} onSuccess={onSuccess} />
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

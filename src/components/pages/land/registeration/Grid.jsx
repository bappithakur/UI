import { Button } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  GridContainer,
  Toolbar,
  DataGrid,
  ButtonDrawer,
} from "../../../layout/common/grid_wrapper";
import { LandService } from "../../../../core/services";
import { useSelector } from "react-redux";
import FormLandRegisteration from "./FormLandRegisteration";

const columns = [
  {
    header: "Zone",
    name: "ddZoneName",
    defaultWidth: 180,
  },
  {
    header: "State",
    defaultWidth: 180,
    name: "ddStateName",
  },
  {
    header: "Land No",
    defaultWidth: 180,
    name: "landNumber",
  },
  {
    header: "Land Area",
    defaultWidth: 180,
    name: "landArea",
  },
  {
    header: "Uom",
    defaultWidth: 180,
    name: "ddUomName",
  },
  {
    header: "Owner",
    defaultWidth: 180,
    name: "ownerName",
  },
  {
    header: "Village",
    defaultWidth: 180,
    name: "village",
  },
  {
    header: "Pincode",
    defaultWidth: 180,
    name: "pincode",
  },
  {
    header: "Description",
    defaultWidth: 180,
    name: "description",
  },
];
const Grid = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authReducer);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await LandService.getLandRegisterationFromCountryList(
      user.countryid
    );

    console.log("response", response);
    if (response) setRecords(response);
    setLoading(false);
  }, [user.countryid]);

  const onSuccess = () => {
    getGridRecords();
  };

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Land Registration">
            <FormLandRegisteration
              onSuccess={onSuccess}
            ></FormLandRegisteration>
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
          minHeight={"75vh"}
          loading={loading}
          uniqueColumn={"lnLandRegisterationId"}
          //onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

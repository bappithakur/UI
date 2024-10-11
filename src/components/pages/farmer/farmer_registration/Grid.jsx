import { Button } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";

import FormFarmer from "./FormFarmer";
import {
  ButtonDrawer,
  GridContainer,
  Toolbar,
  DataGrid,
} from "../../../layout/common/grid_wrapper";
import { BusinessPartnerService } from "../../../../core/services";
import { useSelector } from "react-redux";

const Grid = () => {
  const columns = [
    {
      header: "Farmer Code",
      name: "cBpartnerCode",
      defaultWidth: 180,
    },

    {
      header: "Name",
      name: "businessName",
      defaultWidth: 180,
    },
    {
      header: "Father Name",
      name: "name",
      defaultWidth: 180,
    },
    {
      header: "Mobile",
      name: "contactMobile",
      defaultWidth: 180,
    },
    {
      header: "Email",
      name: "emailContact",
      defaultWidth: 180,
    },
    {
      header: "Village",
      name: "city",
      defaultWidth: 180,
    },

    {
      header: "State",
      name: "state",
      defaultWidth: 180,
    },
    {
      header: "Pin Code",
      name: "pincode",
      defaultWidth: 180,
    },

    {
      header: "Status",
      defaultWidth: 180,
      name: "status",
    },
  ];

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authReducer);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await BusinessPartnerService.getBusinessPartnerList(
      user.countryid
    );

    console.log("response", response);
    if (response) setRecords(response);
    setLoading(false);
  }, [user.countryid]);

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
          <ButtonDrawer title="Farmer Registration">
            <FormFarmer onSuccess={onSuccess} />
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
          uniqueColumn={"cBpartnerId"}
          //onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

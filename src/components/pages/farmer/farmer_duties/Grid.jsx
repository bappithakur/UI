import React, { useState, useEffect, useCallback } from "react";
import { Button, Tabs } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import {
  GridContainer,
  Toolbar,
  DataGrid,
} from "../../../layout/common/grid_wrapper";
import { GridSubFarmerDuties } from "../../child_components/farmer_duties";
import { LandService } from "../../../../core/services";
import { useSelector } from "react-redux";
import { GridSupervisorDuties } from "../../child_components/supervisor_duties";

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

const Grid = (props) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authReducer);
  const [selected, setSelected] = useState(null);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await LandService.getLandRegisterationFromCountryList(
      user.countryid
    );
    console.log("field Supervisors", response);
    if (response) setRecords(response);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  const onSelectionChange = (e) => {
    setSelected(e);
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          {/* <ButtonDrawer title="Farmer Duties">
            <FormFarmerDuties></FormFarmerDuties>
          </ButtonDrawer> */}
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
          uniqueColumn={"lnLandRegisterationId"}
          loading={loading}
          minHeight={"50vh"}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Farmers" key="1">
            <GridSubFarmerDuties header={selected}></GridSubFarmerDuties>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Supervisors" key="2">
            <GridSupervisorDuties header={selected}></GridSupervisorDuties>
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};
export default Grid;

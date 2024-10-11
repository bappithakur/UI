import React, { useCallback, useEffect } from "react";
import { Button, Tabs } from "antd";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";

import FormZone from "./FormZone";
import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../layout/common/grid_wrapper";
import { CoreService } from "../../../../core/services";
import { useState } from "react";
import GridState from "../state/Grid";
import uuid from "react-uuid";
const columns = [
  {
    header: "Country Name",
    name: "Name",
    key: "countryName",
  },
  {
    header: "Description",
    name: "ZoneId",
    key: "code",
  },
  {
    header: "Name",
    name: "Name",
    key: "name",
  },
  {
    header: "Altitude",
    name: "Altitute",
    key: "altitude",
  },
  {
    header: "Latitude",
    name: "Latitude",
    key: "latitude",
  },
  {
    header: "Longitide",
    name: "longitude",
    key: "longitide",
  },
  {
    header: "Description",
    name: "description",
    key: "description",
  },
];
const Grid = (props) => {
  const { id } = props;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();

  const getRecords = useCallback(async () => {
    setLoading(true);
    let response = await CoreService.getZonesList(id);
    console.log("zone List: ", response);

    // SETTING ZONE LIST STATE
    if (response) setRecords(response);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getRecords();
  }, [id, getRecords]);

  const onSelectionChange = async (e) => {
    console.log("PLAN HEADER ROW: ", e);
    setSelected(e);
    // setChildTab(true);
    // let response = await CoreService.getStates(e.countryCode, e.ZoneId);
    // let list = response.map((data, index) => ({ ...data, id: index }));
    // setStateList(list);
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Create">
            <FormZone></FormZone>
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
          uniqueColumn="DdZoneId"
          loading={loading}
          minHeight={"50vh"}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
        {selected ? (
          <Tabs type="card" defaultActiveKey="1">
            <Tabs.TabPane tab="State" key={uuid()}>
              <GridState zone={selected} id={selected.DdZoneId} />
            </Tabs.TabPane>
          </Tabs>
        ) : null}
      </GridContainer>
    </>
  );
};
export default Grid;

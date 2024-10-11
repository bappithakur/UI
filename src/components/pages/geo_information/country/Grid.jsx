import React, { useState, useEffect, useCallback } from "react";
import { Button, Tabs, Space, Switch } from "antd";

import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../layout/common/grid_wrapper";
import { CoreService } from "../../../../core/services";
import FormCountry from "./FormCountry";
import GridZone from "../zone/Grid";
import uuid from "react-uuid";

const columns = [
  {
    header: "Code",
    name: "Code",
    key: "Code",
  },
  {
    header: "Name",
    name: "Name",
    key: "Name",
  },
  {
    header: "Status",
    name: "IsActive",
    render: ({data: {IsActive}}) => (
      <Space size="middle">
        <Switch
          checkedChildren={IsActive ? "Active" : "Inactive"}
          unCheckedChildren="Inactive"
          defaultChecked
        />
      </Space>
    )
  }
];
const Grid = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();

  const getRecords = useCallback(async () => {
    setLoading(true);
    let response = await CoreService.getCountriesList();
    console.log("Countries List: ", response);
    // SETTING COUNTRIES LIST STATE
    if (response) setRecords(response);
    setLoading(false);
  }, []);

  const onSelectionChange = (e) => {
    console.log("PLAN HEADER ROW: ", e);
    setSelected(e);
  };

  useEffect(() => {
    getRecords();
  }, [getRecords]);

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonModal title="Country">
            <FormCountry></FormCountry>
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
          uniqueColumn="DdCountryId"
          loading={loading}
          minHeight={"50vh"}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
        {selected ? (
          <Tabs type="card" defaultActiveKey="1">
            <Tabs.TabPane tab="Zone" key={uuid()}>
              <GridZone country={selected} id={selected.DdCountryId} />
            </Tabs.TabPane>
          </Tabs>
        ) : null}
      </GridContainer>
    </>
  );
};
export default Grid;

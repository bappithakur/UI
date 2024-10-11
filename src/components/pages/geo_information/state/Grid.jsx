import React, { useEffect, useState, useCallback } from "react";
import { Button } from "antd";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
import FormState from "./FormState";
import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../layout/common/grid_wrapper";
import { CoreService } from "../../../../core/services";

const columns = [
  {
    header: "Country Code",
    name: "DdCountryId",
    key: "countryCode",
  },
  {
    header: "Zone Code",
    name: "DdZoneId",
    key: "zoneCode",
  },
  {
    header: "State Code",
    name: "DdStateId",
    key: "stateCode",
  },
  {
    header: "Name",
    name: "Name",
    key: "name",
  },
  {
    header: "Description",
    name: "description",
    key: "description",
  },
];

const Grid = (props) => {
  const { zone, id } = props;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecords = useCallback(async () => {
    setLoading(true);
    let response = await CoreService.getStates(zone.DdCountryId, id);
    console.log("zone List: ", response);

    // SETTING ZONE LIST STATE
    if (response) setRecords(response);
    setLoading(false);
  }, [zone, id]);

  useEffect(() => {
    getRecords();
  }, [id, getRecords]);

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonModal title="State">
            <FormState></FormState>
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
          uniqueColumn="DdStateId"
          loading={loading}
          minHeight={"50vh"}
          //onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

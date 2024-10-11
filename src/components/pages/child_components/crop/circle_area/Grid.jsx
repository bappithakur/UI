import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";

import FormCircleArea from "./FormCircleArea";
import { CropService } from "../../../../../core/services";
import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Country",
    name: "countryName",
  },
  {
    header: "Zone",
    name: "zoneName",
  },
  {
    header: "State",
    name: "stateName",
  },
  {
    header: "Rain Starts On",
    name: "rainStartsOn",
    render: ({ data: { rainStartsOn } }) => <>{rainStartsOn || "-"}</>,
  },
  {
    header: "Sunshine Hours",
    name: "sunshineHours",
    editable: false,
    render: ({ data: { sunshineHours } }) => <>{sunshineHours || "-"}</>,
  },
  {
    header: "Min Humidity",
    name: "minHumidity",
    editable: false,
    render: ({ data: { minHumidity } }) => <>{minHumidity || "-"}</>,
  },
  {
    header: "Max Humidity",
    name: "maxHumidity",
    editable: false,
    render: ({ data: { maxHumidity } }) => <>{maxHumidity || "-"}</>,
  },
  {
    header: "Min Temp.",
    name: "minTemp",
    editable: false,
    render: ({ data: { minTemp } }) => <>{minTemp || "-"}</>,
  },
  {
    header: "Max Temp.",
    name: "maxTemp",
    editable: false,
    render: ({ data: { maxTemp } }) => <>{maxTemp || "-"}</>,
  },
  {
    header: "Avg Rain Fall",
    name: "avgRainFall",
    editable: false,
    render: ({ data: { avgRainFall } }) => <>{avgRainFall || "-"}</>,
  },
];

const Grid = ({ cropCycleId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await CropService.getCropCycleAreaList(cropCycleId);

    if (response) setRecords(response);

    setLoading(false);
  }, [cropCycleId]);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords, cropCycleId]);

  const onSuccess = () => {
    getGridRecords();
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Crop Cycle Area">
            <FormCircleArea cropCycleId={cropCycleId} onSuccess={onSuccess} />
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
          minHeight={"50vh"}
          loading={loading}
          uniqueColumn={"crCropCycleAreaId"}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

import React, { useState, useCallback, useEffect } from "react";
import { Button } from "antd";

import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormCropActivity from "./FormCropActivity";
import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../layout/common/grid_wrapper";
import { CropService } from "../../../../core/services";
import { useSelector } from "react-redux";

const columns = [
  {
    header: "Id",
    defaultWidth: 60,
    name: "CrActivityId",
    editable: false,
  },
  {
    header: "Crop",
    defaultWidth: 140,
    name: "CrCropName",
    editable: false,
  },
  {
    header: "Milestone",
    defaultWidth: 140,
    name: "mileStoneName",
    editable: false,
  },
  {
    header: "Sequence",
    defaultWidth: 60,
    name: "SeqNo",
    editable: false,
  },
  {
    header: "Activity",
    defaultWidth: 240,
    name: "CrActivityName",
    editable: false,
  },
  {
    header: "Duration",
    defaultWidth: 140,
    name: "DurationCount",
    editable: false,
    render: ({ data: { DurationCount, DurationTypeName } }) => (
      <>{`${DurationCount} ${DurationTypeName}`}</>
    ),
  },

  {
    header: "Interval ",
    defaultWidth: 140,
    name: "IntervalDuration",
    editable: false,
    render: ({ data: { IntervalDuration, IntervalTypeName } }) => (
      <>{`${IntervalDuration || "0"} ${IntervalTypeName}`}</>
    ),
  },
  {
    header: "Link To",
    defaultWidth: 100,
    name: "LinkedSeqId",
    editable: false,
  },
  {
    header: "Remarks",
    defaultWidth: 140,
    name: "Remarks",
    editable: false,
  },
];

const Grid = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    user: { countryid },
  } = useSelector((state) => state.authReducer);

  const getGridRecords = useCallback(async () => {
    setLoading(true);

    let response = await CropService.getCropActivityListFromCountry(countryid);
    console.log(response);
    if (response) {
      setRecords(response);
    }
    setLoading(false);
  }, [countryid]);

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
          <ButtonDrawer title="Crop Activity">
            <FormCropActivity onSuccess={onSuccess} />
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
          uniqueColumn="CrActivityId"
          loading={loading}
          minHeight={"75vh"}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

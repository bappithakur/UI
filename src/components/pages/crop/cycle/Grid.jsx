import { Button, Tabs } from "antd";
import { useSelector } from "react-redux";
import React, { useEffect, useCallback, useState } from "react";
import {
  DeleteOutlined,
  ExportOutlined,
  CloudSyncOutlined,
} from "@ant-design/icons";

import FormCycle from "./FromCycle";
import { GridCircleArea } from "../../child_components/crop";
import { CropService } from "../../../../core/services/CropService";
import {
  Toolbar,
  DataGrid,
  ButtonDrawer,
  GridContainer,
} from "../../../layout/common/grid_wrapper";

const { TabPane } = Tabs;

const columns = [
  {
    header: "Crop",
    defaultWidth: 140,
    name: "cropName",
    editable: false,
  },
  {
    header: "Crop Variety",
    defaultWidth: 140,
    name: "cropVarietyName",
    editable: false,
  },
  {
    header: "Season",
    defaultWidth: 140,
    name: "snSeasonName",
    editable: false,
  },
  {
    header: "Cycle",
    defaultWidth: 140,
    name: "crCropCycleName",
    editable: false,
  },
  {
    header: "From Week",
    defaultWidth: 140,
    name: "fromWeek",
    editable: false,
  },
  {
    header: "To Week",
    defaultWidth: 140,
    name: "toWeek",
    editable: false,
  },
  {
    header: "Expected Revenue",
    defaultWidth: 140,
    name: "expectedRevenue",
    editable: false,
  },
  {
    header: "Expected Cost",
    defaultWidth: 140,
    name: "expectedCost",
    editable: false,
  },
  {
    header: "Expected Profit",
    defaultWidth: 140,
    name: "expectedProfit",
    editable: false,
  },
  {
    header: "Remarks",
    defaultWidth: 140,
    name: "remarks",
    render: ({ data: { remarks } }) => <>{remarks || "-"}</>,
  },
];

const Grid = ({ planLineId }) => {
  const [isUpdated, setUpdated] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const onSelectionChange = (e) => {
    setSelected(e);
  };

  const { user } = useSelector((state) => state.authReducer);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await CropService.getCropCycleList(user.countryid);

    if (response) setRecords(response);

    setLoading(false);
  }, [user.countryid]);

  const createPlanLines = async () => {
    let response = await CropService.createBusinessPlanCycles(planLineId);
    if (response) setUpdated(!isUpdated);
  };

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords, planLineId, isUpdated]);

  const onSuccess = () => {
    getGridRecords();
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Crop Cycle">
            <FormCycle onSuccess={onSuccess} />
          </ButtonDrawer>
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<ExportOutlined />}
          />
          <Button
            type="dashed"
            className="float-start ms-1"
            onClick={createPlanLines}
            icon={<CloudSyncOutlined />}
          />
          <Button
            type="dashed"
            className="float-start ms-1"
            icon={<DeleteOutlined />}
          />
        </Toolbar>
        <DataGrid
          minHeight={"50vh"}
          onSelectionChange={onSelectionChange}
          loading={loading}
          uniqueColumn={"crCropCycleId"}
          columns={columns}
          records={records}
        />
      </GridContainer>
      {selected ? (
        <Tabs type="card">
          <TabPane tab="Crop Cycle Area">
            <GridCircleArea cropCycleId={selected.crCropCycleId} />
          </TabPane>
        </Tabs>
      ) : null}
    </>
  );
};
export default Grid;

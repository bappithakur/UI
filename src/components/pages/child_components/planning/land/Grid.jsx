import { Button, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import { LandService } from "../../../../../core/services";
import FormLandPlanning from "../../../planning/land_planning/FormLandPlanning";
import {
  ButtonDrawer,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
import { LAND_TYPE } from "../../../../../core/constants/constants";

const columns = [
  {
    header: "Country",
    name: "countryName",
  },
  {
    header: "State",
    name: "stateName",
  },
  {
    header: "Crop",
    name: "cropName",
  },
  {
    header: "Variety",
    name: "cropVarietyName",
  },
  {
    header: "Land Type",
    name: "landType",
    render: ({ data: { landType } }) => <>{LAND_TYPE[landType]}</>,
  },
  {
    header: "Total Requirement",
    name: "totalRequirement",
  },
  {
    header: "Land Planned",
    name: "landPlanned",
    render: ({ data: { landPlanned } }) => <>{landPlanned || 0}</>,
  },
  // {
  //   header: "Land Area UOM",
  //   name: "landAreaUom",
  // },
  // {
  //   header: "Yield Per Land Area",
  //   name: "yieldPerLandArea",
  // },
];

const Grid = ({ planId }) => {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClose = () => {};
  const onSuccess = () => {
    getGridRecords();
  };

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    const response = await LandService.getPlanLandList(planId);
    console.log({ response });

    if (response) setRecords(response);

    setLoading(false);
  }, [planId]);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Land Planning">
            <FormLandPlanning
              planId={planId}
              onClose={onClose}
              onSuccess={onSuccess}
            />
          </ButtonDrawer>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            centered
            onCancel={(e) => setIsModalOpen(false)}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
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
          uniqueColumn={"ppPlanLandId"}
          editable={true}
          minHeight={"50vh"}
          loading={loading}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};

export default Grid;

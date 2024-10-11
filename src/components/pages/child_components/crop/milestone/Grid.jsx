import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import FormMilestone from "./FormMilestone";
import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";

import { CropService } from "../../../../../core/services";

const columns = [
  {
    header: "Name",
    name: "crCropMilestoneName",
  },
  {
    header: "Remarks",
    name: "remarks",
  },
];

const Grid = ({ cropId }) => {
  const { user } = useSelector((state) => state.authReducer);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await CropService.getCropMilestoneList(
      user.countryid,
      cropId
    );
    if (response) {
      setRecords(response);
    }

    setLoading(false);
  }, [user.countryid, cropId]);

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
          <ButtonModal title="Milestone">
            <FormMilestone onSuccess={onSuccess} cropId={cropId} />
          </ButtonModal>
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
          columns={columns}
          records={records}
          uniqueColumn={"crCropMilestoneId"}
          loading={loading}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

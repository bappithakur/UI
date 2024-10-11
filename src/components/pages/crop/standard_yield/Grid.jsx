import { Button } from "antd";
import { useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormCrop from "./FormCrop";
import { CropService } from "../../../../core/services/CropService";
import {
  DataGrid,
  GridContainer,
  Toolbar,
  ButtonDrawer,
} from "../../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Country",
    name: "ddCountryName",
  },
  {
    header: "State",
    name: "ddStateName",
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
    header: "Yield",
    name: "qty",
    render: ({ data: { uomName, qty } }) => (
      <>{qty ? `${qty} ${uomName}` : "-"}</>
    ),
  },
  {
    header: "Land Required",
    name: "landRequired",
    render: ({ data: { landRequired } }) => (
      <>{landRequired ? `${landRequired} Acre` : "-"}</>
    ),
  },
  {
    header: "Plant Distance",
    name: "plantDistance",
  },
  {
    header: "Plant DistanceUom",
    name: "plantDistanceUom",
  },
  {
    header: "Row Distance",
    name: "rowDistance",
  },
  {
    header: "Row Distance Uom",
    name: "rowDistanceUom",
  },
  {
    header: "Count Per Plant",
    name: "countPerPlant",
  },
  {
    header: "Remarks",
    name: "remarks",
    render: ({ data: { remarks } }) => <>{remarks || "-"}</>,
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
    let response = await CropService.getStandardYield(countryid);

    if (response) setRecords(response);

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
          <ButtonDrawer title="Standard Yield">
            <FormCrop onSuccess={onSuccess} />
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
          minHeight={"75vh"}
          columns={columns}
          loading={loading}
          uniqueColumn={"crCropStdYieldId"}
          records={records}
        />
      </GridContainer>
    </>
  );
};

export default Grid;

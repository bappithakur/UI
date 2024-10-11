import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import {
  ButtonModal,
  DataGrid,
  GridContainer,
  Toolbar,
} from "../../../../layout/common/grid_wrapper";
import FormSubClassification from "./FormSubClassification";
import { CropService } from "../../../../../core/services";

const columns = [
  {
    header: "Crop",
    name: "cropName",
    key: "crop",
  },
  {
    header: "Name",
    name: "subCropName",
    key: "name",
  },
];

const Grid = (props) => {
  const { cropData } = props;
  const { cropId, cropName } = cropData;
  const [records, setRecords] = useState([]);
  const [laoding, setLoading] = useState(false);
  console.log("cropData", cropId);
  const getSubCropClassfication = useCallback(async (cropId, cropName) => {
    setLoading(true);
    let response = await CropService.getCropSubClassificationList(cropId);
    var list = response.map(function (el, index) {
      return {
        id: index,
        cropName: cropName,
        subCropName: el.cropSubClassName,
      };
    });
    // SETTING COUNTRIES LIST STATE
    setRecords(list);
    setLoading(false);
  }, []);
  useEffect(() => {
    getSubCropClassfication(cropId, cropName);
  }, [cropId, cropName, getSubCropClassfication]);

  const onSuccess = () => {
    getSubCropClassfication(cropId, cropName);
  };
  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonModal title="Crop Subclassifications">
            <FormSubClassification onSuccess={onSuccess} cropId={cropId} />
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
          loading={laoding}
          minHeight={"50vh"}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormFinancialYear from "./FormFinancialYear";
// import { GridSubCrop } from "../../child_components/crop";
import { CoreService } from "../../../../core/services/CoreService";
import {
  DataGrid,
  GridContainer,
  Toolbar,
  ButtonDrawer,
} from "../../../layout/common/grid_wrapper";
import { Utils } from "../../../../core/helpers";

const columns = [
  {
    name: "financialYearName",
    header: "Financial Year",
  },
  {
    name: "fromDate",
    header: "From Date",
    render: ({ data: { fromDate } }) => (
      <>{fromDate ? Utils.formatDate(fromDate) : "-"}</>
    ),
  },
  {
    name: "toDate",
    header: "To Date",
    render: ({ data: { toDate } }) => (
      <>{toDate ? Utils.formatDate(toDate) : "-"}</>
    ),
  },
];

const Grid = () => {
  // const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await CoreService.getFinancialYearsList();

    if (response) setRecords(response);

    setLoading(false);
  }, []);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  // const onSelectionChange = (e) => {
  //   setSelected(e);
  // };

  const onSuccess = () => {
    getGridRecords();
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Financial Year">
            <FormFinancialYear onSuccess={onSuccess} />
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
          minHeight={"55vh"}
          // onSelectionChange={onSelectionChange}
          columns={columns}
          loading={loading}
          uniqueColumn={"ddFinYearId"}
          records={records}
        />
      </GridContainer>
      {/* {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Best Suited Conditions" key="1">
            <GridSubCrop />
          </Tabs.TabPane>
        </Tabs>
      ) : null} */}
    </>
  );
};
export default Grid;

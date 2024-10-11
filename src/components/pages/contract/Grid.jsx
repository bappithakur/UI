import { Button, Space, Switch, Tabs } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import { Utils } from "../../../core/helpers/Utils";
import { GridSubcontract } from "../child_components/contract";
import { ContactService } from "../../../core/services/ContractService";
import {
  GridContainer,
  Toolbar,
  DataGrid,
} from "../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Contract No",
    defaultWidth: 180,
    name: "contractNo",
  },
  {
    header: "Contract Date",
    defaultWidth: 180,
    name: "contractDate",
    render: ({ data: { contractDate } }) => (
      <>{contractDate ? Utils.formatDate(contractDate) : "-"}</>
    ),
  },
  {
    header: "Business Partner",
    defaultWidth: 180,
    name: "bpartnerName",
  },
  {
    header: "Remarks",
    defaultWidth: 180,
    name: "remarks",
    render: ({ data: { remarks } }) => <>{remarks || "-"}</>,
  },
  {
    header: "Status",
    defaultWidth: 180,
    name: "isActive",
    render: ({ data: { isActive } }) => (
      <Space size="middle">
        <Switch
          checkedChildren={isActive ? "Active" : "Inactive"}
          unCheckedChildren="Inactive"
          defaultChecked
        />
      </Space>
    ),
  },
  {
    header: "Vaild Till",
    name: "validTill",
    defaultWidth: 180,
    render: ({ data: { validTill } }) => (
      <>{validTill ? Utils.formatDate(validTill) : "-"}</>
    ),
  },
];

const Grid = () => {
  const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await ContactService.getLandContractList();

    if (response) {
      setRecords(response);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  const onSelectionChange = (e) => {
    console.log("selected", e);
    setSelected(e);
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
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
          loading={loading}
          uniqueColumn={"cnContractId"}
          minHeight={"55vh"}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
        />
      </GridContainer>
      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Contract Lines" key="1">
            <GridSubcontract contractId={selected.cnContractId} />
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};
export default Grid;

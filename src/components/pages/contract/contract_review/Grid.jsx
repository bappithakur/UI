import React, { useCallback, useEffect, useState } from "react";
import { Button, Tabs, Space, Switch } from "antd";
import FormContract from "./FormContract";

import {
  ButtonDrawer,
  GridContainer,
  Toolbar,
  DataGrid,
} from "../../../layout/common/grid_wrapper";
import { GridSubcontract } from "../../child_components/contract";
import { Utils } from "../../../../core/helpers";
import { ContactService } from "../../../../core/services/ContractService";

const columns = [
  {
    header: "Action",
    name: "country",
    defaultWidth: 270,
    render: ({ data }) => (
      <Space size="middle">
        <Button type="primary">Approve</Button>
        <Button>Hold</Button>
        <Button danger>Reject</Button>
      </Space>
    ),
  },
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
    setSelected(e);
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer icon={false} title="Land Contract">
            <FormContract />
          </ButtonDrawer>
        </Toolbar>
        <DataGrid
          loading={loading}
          uniqueColumn={"cnContractId"}
          minHeight={"50vh"}
          onSelectionChange={onSelectionChange}
          columns={columns}
          records={records}
          checkboxColumn={false}
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

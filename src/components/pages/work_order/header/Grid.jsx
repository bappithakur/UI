import { Button, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import { Utils } from "../../../../core/helpers";
import FormWorkOrderHeader from "./FormWorkOrderHeader";
import { WorkOrderService } from "../../../../core/services";
import {
  GridWorkOrderActivities,
  GridWorkOrderLine,
} from "../../child_components/Work_Order_lines";
import {
  ButtonDrawer,
  GridContainer,
  Toolbar,
  DataGrid,
} from "../../../layout/common/grid_wrapper";
import CustomDropdown from "../../../common/CustomDropdown";
import { getDropdownOptionsAction } from "../../../../core/redux/actions/DropdownAction";

const columns = [
  {
    header: "Action",
    name: "status",
    defaultWidth: 200,
    render: ({ data: { status, woWorkOrderId } }) => (
      <CustomDropdown
        requestData={{
          cb: WorkOrderService.updateWorkOrderStatus,
          id: woWorkOrderId,
          uniqueColumn: "woWorkOrderId",
          field: "status",
        }}
        selected={status}
        name={"workOrderStatusList"}
      />
    ),
  },
  {
    header: "Work Order No",
    name: "workOrderNo",
  },
  {
    header: "Work Date",
    name: "woDate",
    render: ({ data: { woDate } }) => (
      <>{woDate ? Utils.formatDate(woDate) : "-"}</>
    ),
  },
  {
    header: "Plan No",
    name: "planNo",
    render: ({ data: { planNo } }) => <>{planNo || "-"}</>,
  },
  {
    header: "Plan Description",
    name: "planDescription",
    render: ({ data: { planDescription } }) => <>{planDescription || "-"}</>,
  },
  {
    header: "Country",
    name: "countryName",
    render: ({ data: { countryName } }) => <>{countryName || "-"}</>,
  },
  {
    header: "Zone",
    name: "zoneName",
    render: ({ data: { zoneName } }) => <>{zoneName || "-"}</>,
  },
  {
    header: "State",
    name: "stateName",
    render: ({ data: { stateName } }) => <>{stateName || "-"}</>,
  },
  {
    header: "Crop",
    name: "cropName",
    render: ({ data: { cropName } }) => <>{cropName || "-"}</>,
  },
  {
    header: "Crop Variety",
    name: "cropVarietyName",
    render: ({ data: { cropVarietyName } }) => <>{cropVarietyName || "-"}</>,
  },
  {
    header: "Plan Qty.",
    name: "planQty",
  },
  {
    header: "Description",
    name: "woDescription",
    render: ({ data: { woDescription } }) => <>{woDescription || "-"}</>,
  },
  {
    header: "Remarks",
    name: "woRemarks",
    render: ({ data: { woRemarks } }) => <>{woRemarks || "-"}</>,
  },
];

const Grid = () => {
  const dispatch = useDispatch();
  const {
    user: { countryid },
  } = useSelector((state) => state.authReducer);

  const [selected, setSelected] = useState();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectionChange = (e) => {
    setSelected(e);
  };

  const onSuccess = () => {
    getGridRecords();
  };

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await WorkOrderService.getWorkOrdersList(countryid);
    console.log("Work order header : ", response);
    if (response) setRecords(response);

    setLoading(false);
  }, [countryid]);

  const getWOrkOrderStatusList = useCallback(async () => {
    let response = await WorkOrderService.getWorkOrderDocumentStatus();

    if (response) {
      const list = response.map((el) => {
        return {
          label: el.woStatusName,
          value: el.woStatusCode,
        };
      });

      dispatch(getDropdownOptionsAction(list));
    }
  }, [dispatch]);

  useEffect(() => {
    getGridRecords();
    getWOrkOrderStatusList();
  }, [getGridRecords, getWOrkOrderStatusList]);

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Work Order">
            <FormWorkOrderHeader onSuccess={onSuccess} />
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
          uniqueColumn={"woWorkOrderId"}
          minHeight={"50vh"}
          loading={loading}
          columns={columns}
          records={records}
          onSelectionChange={onSelectionChange}
        />
      </GridContainer>

      {selected ? (
        <Tabs type="card" defaultActiveKey="1">
          <Tabs.TabPane tab="Work Order Lines" key="1">
            <GridWorkOrderLine selected={selected} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Work Order Activities" key="2">
            <GridWorkOrderActivities
              workOrderId={selected.woWorkOrderId}
              cropId={selected.crCropId}
            />
          </Tabs.TabPane>
        </Tabs>
      ) : null}
    </>
  );
};
export default Grid;

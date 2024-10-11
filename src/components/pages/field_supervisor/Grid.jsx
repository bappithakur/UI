import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormFieldSupervisor from "./FormFieldSupervisor";
import { HumanResourceService } from "../../../core/services";
import {
  ButtonDrawer,
  GridContainer,
  Toolbar,
  DataGrid,
} from "../../layout/common/grid_wrapper";

const columns = [
  {
    header: "Code",
    name: "memberCode",
    defaultWidth: 180,
  },

  {
    header: "Name",
    defaultWidth: 180,
    name: "firstName",
  },
  {
    header: "Mobile No",
    defaultWidth: 180,
    name: "contactPersonal",
  },
  {
    header: "Email",
    defaultWidth: 180,
    name: "emailOfficial",
  },
  {
    header: "Blood Group",
    defaultWidth: 180,
    name: "bloodGroup",
  },
  {
    header: "Gender",
    defaultWidth: 180,
    name: "gender",
  },
  {
    header: "Joining Date",
    defaultWidth: 180,
    name: "jobStart",
  },
  {
    header: "Status",
    defaultWidth: 180,
    name: "status",
  },
];

const Grid = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGridRecords = useCallback(async () => {
    setLoading(true);
    let response = await HumanResourceService.getHumanResourceMemberList();
    if (response) setRecords(response);
    setLoading(false);
  }, []);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  const onSuccess = () => {
    getGridRecords();
  };

  const onSelectionChange = (e) => {
    console.log("selected", e);
  };

  return (
    <>
      <GridContainer>
        <Toolbar>
          <ButtonDrawer title="Field Supervisor">
            <FormFieldSupervisor onSuccess={onSuccess} />
          </ButtonDrawer>
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
          minHeight={"75vh"}
          onSelectionChange={onSelectionChange}
          loading={loading}
          uniqueColumn={"hrMemberId"}
          columns={columns}
          records={records}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

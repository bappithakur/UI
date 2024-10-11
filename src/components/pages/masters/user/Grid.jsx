import { Button, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";

import FormUser from "./FormUser";
import { Utils } from "../../../../core/helpers/Utils";
import {
  DataGrid,
  GridContainer,
  Toolbar,
  ButtonDrawer,
} from "../../../layout/common/grid_wrapper";
import { CoreService } from "../../../../core/services";
import FormUpdatePassword from "./FormUpdatePassword";

const columns = [
  {
    name: "name",
    header: "Name",
  },
  {
    name: "eMail",
    header: "Email",
  },
  {
    name: "validTill",
    header: "Valid Till",
    render: ({ data: { validTill } }) => (
      <>{validTill ? Utils.formatDate(validTill) : "-"}</>
    ),
  },
];

let userId;

const Grid = () => {
  const [records, setRecords] = useState([]);
  const [isModelOpen, setModelOpen] = useState(false);

  const getGridRecords = useCallback(async () => {
    let response = await CoreService.getUserList();

    if (response) {
      setRecords(response);
    }
  }, []);

  useEffect(() => {
    getGridRecords();
  }, [getGridRecords]);

  const onRowDoubleClick = (user) => {
    setModelOpen(true);
    userId = user.ddUserId;
  };

  const onSuccess = () => {
    getGridRecords();
  };

  return (
    <>
      <GridContainer>
        <Modal
          destroyOnClose={true}
          title="Update Password"
          footer={[]}
          centered
          onCancel={() => setModelOpen(false)}
          open={isModelOpen}
        >
          <FormUpdatePassword
            userId={userId}
            onClose={() => setModelOpen(false)}
          />
        </Modal>
        <Toolbar>
          <ButtonDrawer title="User">
            <FormUser onSuccess={onSuccess} />
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
          columns={columns}
          onRowDoubleClick={onRowDoubleClick}
          uniqueColumn={"ddUserId"}
          records={records}
        />
      </GridContainer>
    </>
  );
};
export default Grid;

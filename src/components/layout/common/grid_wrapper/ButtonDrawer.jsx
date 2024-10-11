import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const ButtonDrawer = (props) => {
  const { children, title, icon, btnType } = props;
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title={title}
        width={640}
        placement="right"
        closable={true}
        destroyOnClose={true}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        {React.cloneElement(children, { onClose })}
      </Drawer>
      <Button
        type={btnType ?? "dashed"}
        className="float-start"
        onClick={showDrawer}
        icon={icon ?? <PlusOutlined />}
      ></Button>
    </>
  );
};
export default ButtonDrawer;

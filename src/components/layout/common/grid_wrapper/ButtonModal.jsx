import { Button, Modal } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const ButtonModal = (props) => {
  const { children, title, icon, btnType, width } = props;
  const [open, setOpen] = useState(false);

  const showModal = (param) => {
    setOpen(param);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={title}
        centered
        visible={open}
        footer={[]}
        width={width ?? 500}
        // onOk={() => showModal(false)}
        onCancel={() => showModal(false)}
      >
        {React.cloneElement(children, { onClose })}
      </Modal>
      <Button
        type={btnType ?? "dashed"}
        className="float-start"
        onClick={() => showModal(true)}
        icon={icon ?? <PlusOutlined />}
      ></Button>
    </>
  );
};
export default ButtonModal;

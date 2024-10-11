import { Tabs, message } from "antd";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import Content from "./Content";
import Sidebar from "./Sidebar";

const MasterLayout = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [items, setItems] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    document.body.classList.add("dark-sidebar");
  }, []);

  useEffect(() => {
    if (!isLoggedIn)
      message.error("You are not authenticated with the system.");
  }, [isLoggedIn]);

  const onChange = (key) => {
    setActiveKey(key);
  };

  const onNavClick = (result) => {
    if (isLoggedIn) {
      let activeKey = result.guid;
      let isAlreadyExist = items.some((item) => item.key === result.guid);
      if (!isAlreadyExist) {
        setItems([
          ...items,
          {
            label: result.title,
            children: result.element,
            key: activeKey,
          },
        ]);
      }

      setActiveKey(activeKey);
      return;
    }

    message.error("You are not authenticated with the system.");
    return;
  };

  const remove = (targetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);

    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey, action) => {
    if (action !== "add") {
      remove(targetKey);
    }
  };

  return (
    <>
      <Sidebar onNavClick={onNavClick} />
      <Content>
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
          items={items}
        />
        {/* <Footer /> */}
      </Content>
    </>
  );
};

export default MasterLayout;

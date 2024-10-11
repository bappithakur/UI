import React from "react";

import menuData from "../pages/static/menu";
import TablerIcon from "../common/TablerIcon";
import {
  Topbar,
  LeftSidebar,
  Logo,
  Menu,
  MenuGroup,
  MenuItem,
} from "./common/master";

const Sidebar = ({ onNavClick }) => {
  return (
    <>
      <LeftSidebar>
        <Logo />
        <Menu>
          {menuData.map((item) => (
            <MenuGroup key={item.guid} title={item.group}>
              {item.menu.map((item) => (
                <MenuItem
                  onNavClick={onNavClick}
                  key={item.guid}
                  guid={item.guid}
                  title={item.title}
                  items={item.items}
                  element={item.element}
                  url={item.url}
                  icon={
                    <TablerIcon
                      icon={item.icon}
                      cssClass="menu-icon"
                      size={18}
                    />
                  }
                />
              ))}
            </MenuGroup>
          ))}
        </Menu>
      </LeftSidebar>
      <Topbar />
    </>
  );
};
export default Sidebar;

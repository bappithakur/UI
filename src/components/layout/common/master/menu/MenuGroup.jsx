import React from "react";

const MenuGroup = ({ children, title }) => {
  return (
    <>
      {title ? (
        <li className="menu-label mt-0">
          {title[0]}
          <span>{title.substring(1)}</span>
        </li>
      ) : null}
      {children}
    </>
  );
};

export default MenuGroup;

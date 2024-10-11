import React from "react";

const Menu = ({ children }) => {
  return (
    <div className="menu-content h-100" data-simplebar>
      <div className="menu-body navbar-vertical tab-content">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">{children}</ul>
        </div>
      </div>
    </div>
  );
};
export default Menu;

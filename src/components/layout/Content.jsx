import React from "react";

const Content = (props) => {
  const { children } = props;
  return (
    <div className="page-wrapper">
      <div className="page-content-tab p-0">
        <div className="container-fluid p-0">{children}</div>
      </div>
    </div>
  );
};
export default Content;

import React from "react";
import * as LABELS from "./../../../../core/constants/constants";

const Logo = () => {
  return (
    <div className="brand p-1">
      <a href="#/" className="logo">
        <span>
          <h4 className="text-white text-uppercase logo-small">
            {LABELS.PROJECT_TITLE[0]}
          </h4>
        </span>

        <span>
          {/* <Image className="logo-sm" src={logo} /> */}
          <h4 className="text-white text-uppercase logo-lg logo-light">
            {LABELS.PROJECT_TITLE}
          </h4>
        </span>
      </a>
    </div>
  );
};
export default Logo;

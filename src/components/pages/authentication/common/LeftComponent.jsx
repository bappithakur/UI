import React from "react";
import { Image } from "antd";
import * as LABELS from "../../../../core/constants/constants";
import logo from "./../../../../assets/images/merino.jpg";

const LeftComponent = () => {
  return (
    <div className="d-none d-sm-block col-md-7 col-xl-8 col-lg-7  p-0 vh-100 d-flex  auth-bg  vh-100">
      <div className="accountbg d-flex align-items-center vh-100 justify-content-center">
        <div className="account-title text-center text-white">
          {/* <img src="/Content/images/merino.jpg" alt="" className="thumb-lg"> */}
          <Image className="thumb-lg" src={logo} />
          <h2 className="mt-3 text-white">
            Welcome To
            <span className="text-warning ms-2">{LABELS.PROJECT_TITLE}</span>
          </h2>
          <p className="font-18 mt-0">Let's Get Started.</p>
          <div className="border w-25 mx-auto border-warning"></div>
        </div>
      </div>
    </div>
  );
};

export default LeftComponent;

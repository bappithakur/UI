import React from "react";

import LoginForm from "./form/LoginForm";
import LeftComponent from "./common/LeftComponent";
import * as LABELS from "../../../core/constants/constants";

const Login = () => {
  return (
    <section className="bg-card">
      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-12">
            <div className="card-body p-0">
              <div className="row d-flex align-items-center">
                <LeftComponent />
                <div className="col-md-5 col-xl-4 col-lg-5 d-flex align-items-center justify-content-center vh-100">
                  <div className="card mb-0 border-0 w-100">
                    <div className="card-body pt-0 mt-0">
                      <div>
                        <h4 className="mt-3 mb-1 fw-semibold font-20">
                          {LABELS.PROJECT_TITLE}
                        </h4>
                        <p className="text-muted  mb-2">
                          Sign in to continue to System.
                        </p>
                        <div className="border border-1 w-25 border-primary"></div>
                      </div>
                      <LoginForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;

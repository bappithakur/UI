import React from "react";
import { COMPANY_NAME, PROJECT_TITLE } from "../../../../core/constants/constants";

const Footer = (props) => {
  return (
    <footer className="footer text-center text-sm-start">
      © <script>document.write(new Date().getFullYear())</script>2022 {PROJECT_TITLE}
      <span className="text-muted d-none d-sm-inline-block float-end">
        Crafted with <i className="mdi mdi-heart text-danger"></i> by {COMPANY_NAME}
      </span>
    </footer>
  );
};
export default Footer;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconBell,
  IconMenu2,
  IconPower,
  IconSettings,
  IconUser,
  IconKey,
} from "@tabler/icons";
import { Modal } from "antd";

import userIcon from "./../../../../assets/images/merino.jpg";
import { LOCAL_STORAGE_KEYS } from "../../../../core/constants";
import { LocalStorage } from "../../../../core/helpers/LocalStorage";
import { logOutAction } from "../../../../core/redux/actions/AuthAction";
import FormChangePassword from "./menu/FormChangePassword";

const Topbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.authReducer);

  const onClickMenuIcon = () => {
    document.body.classList.toggle("enlarge-menu");
  };

  const [isToggle, setToggle] = useState(false);

  const handleLogout = () => {
    LocalStorage.removeItem(LOCAL_STORAGE_KEYS.PROFILE_KEY);
    LocalStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
    dispatch(logOutAction());
  };

  const showModal = (param) => {
    setOpen(param);
  };

  return (
    <div className="topbar">
      <Modal
        title="Change Password"
        centered
        open={open}
        footer={[]}
        width={500}
        onCancel={() => showModal(false)}
      >
        <FormChangePassword onClose={() => showModal(false)} />
      </Modal>

      <nav className="navbar-custom">
        <ul className="list-unstyled topbar-nav float-end mb-0">
          <li className="dropdown notification-list">
            <a
              className="nav-link dropdown-toggle arrow-none nav-icon"
              data-bs-toggle="dropdown"
              href="/"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <IconBell size={20} />
              <span className="alert-badge"></span>
            </a>
          </li>
          <li className="dropdown">
            <a
              className="nav-link dropdown-toggle nav-user"
              data-bs-toggle="dropdown"
              href="#/"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
              onClick={() => setToggle(!isToggle)}
            >
              <div className="d-flex align-items-center">
                <img
                  src={userIcon}
                  alt="profile-user"
                  className="rounded-circle me-2 thumb-sm"
                />
                <div>
                  <small className="d-none d-md-block font-11">
                    {user.country}
                  </small>
                  <span className="d-none d-md-block fw-semibold font-12">
                    {user.name} <i className="mdi mdi-chevron-down"></i>
                  </span>
                </div>
              </div>
            </a>
            <div
              className={`dropdown-menu dropdown-menu-end ${
                isToggle ? "show" : ""
              }`}
            >
              <a className="dropdown-item" href="#/">
                <IconUser
                  className="font-16 me-1 align-text-bottom"
                  size={16}
                />
                Profile
              </a>
              <a
                onClick={() => showModal(true)}
                className="dropdown-item"
                href="#/"
              >
                <IconKey className="font-16 me-1 align-text-bottom" size={16} />
                Change Password
              </a>
              <a className="dropdown-item" href="#/">
                <IconSettings
                  className="font-16 me-1 align-text-bottom"
                  size={16}
                />
                Settings
              </a>
              <div className="dropdown-divider mb-0"></div>
              <span className="dropdown-item cursor" onClick={handleLogout}>
                <IconPower
                  className="font-16 me-1 align-text-bottom"
                  size={16}
                />
                Logout
              </span>
            </div>
          </li>
        </ul>
        <ul className="list-unstyled topbar-nav mb-0">
          <li>
            <button
              onClick={(e) => onClickMenuIcon(e)}
              className="nav-link button-menu-mobile nav-icon"
            >
              <IconMenu2 />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Topbar;

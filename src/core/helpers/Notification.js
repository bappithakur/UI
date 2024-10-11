import { message } from "antd";
import { LOCAL_STORAGE_KEYS } from "../constants";

import { LocalStorage } from "./LocalStorage";

const duration = 3; // 3 seconds

export const showMessage = (content, status) => {
  if (content) {
    if ([200, 201].includes(status)) {
      message.success(content, duration);
    } else if (status === 400) {
      message.warning(content, duration);
    } else if ([401, 403].includes(status)) {
      LocalStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
      LocalStorage.removeItem(LOCAL_STORAGE_KEYS.PROFILE_KEY);
      window.location.href = "/";
      message.error(content, duration);
    } else if ([500, 501, 502, 503].includes(status)) {
      message.error(content, duration);
    } else {
      message.info(content, duration);
    }
  }
};

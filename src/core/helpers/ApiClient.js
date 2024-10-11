import axios from "axios";

import { showMessage } from "./Notification";
import { LocalStorage } from "./LocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants";

const ApiClient = axios.create();

ApiClient.interceptors.request.use(
  (config) => {
    const TOKEN =
      LocalStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY)?.userToken || "";
    config.headers.authorization = `Bearer ${TOKEN}`;
    return config;
  },
  (err) => {
    console.log("Errrrrrrrrr", { err });
    return Promise.reject(err);
  }
);

ApiClient.interceptors.response.use(
  (response) => {
    return handleResponse(response);
  },
  (err) => {
    return handleError(err);
  }
);

const handleError = (err) => {
  console.log("API client Error", err);

  if (err.response.status !== 200) {
    const res = null;
    showMessage(err.response.statusText || err.message, err.response.status);
    return res;
  }
};

const handleResponse = (res) => {
  // remove when backend team send proper status code in res
  showMessage(res.data.message, res.status);

  if ([200, 201].includes(res.status)) {
    let newResponse = {
      status: res.status,
      success: false,
      message: null,
      data: null,
      errors: [],
    };

    if (res.data.data)
      return { ...newResponse, success: true, data: JSON.parse(res.data.data) };

    return newResponse;
  }
};

export default ApiClient;

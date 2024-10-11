import { SET_LOGIN, SET_LOG_OUT } from "../constants";
import { LocalStorage } from "../../helpers/LocalStorage";
import { LOCAL_STORAGE_KEYS } from "../../constants";

const initialData = {
  user: LocalStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE_KEY),
  isLoggedIn: LocalStorage.hasItem(LOCAL_STORAGE_KEYS.PROFILE_KEY),
};

const authReducer = (data = initialData, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOGIN:
      return payload;
    case SET_LOG_OUT:
      return { ...data, isLoggedIn: false };
    default:
      return data;
  }
};

export default authReducer;

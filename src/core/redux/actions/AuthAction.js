import { GET_LOGIN, GET_LOG_OUT } from "../constants";

export const getLoginAction = (data) => {
  return {
    type: GET_LOGIN,
    payload: data,
  };
};

export const logOutAction = () => {
  return {
    type: GET_LOG_OUT,
  };
};

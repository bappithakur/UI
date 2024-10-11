import { SET_DROPDOWN_OPTIONS } from "../constants";

const dropdownReducer = (data = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DROPDOWN_OPTIONS:
      return { workOrderStatusList: payload };
    default:
      return data;
  }
};

export default dropdownReducer;

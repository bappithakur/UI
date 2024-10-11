import { GET_DROPDOWN_OPTIONS } from "../constants";

export const getDropdownOptionsAction = (data) => {
  return {
    type: GET_DROPDOWN_OPTIONS,
    payload: data,
  };
};

import { SET_BUSINESS_PLAN_HADER } from "../constants";

const planingReducer = (data = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_BUSINESS_PLAN_HADER:
      return payload.data;
    default:
      return data;
  }
};

export default planingReducer;

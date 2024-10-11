import { CREATE_BUSINESS_PLAN_HADER, GET_BUSINESS_PLAN_HADER } from "../constants";

export const businessPlanHaderAction = (data) => {
  return {
    type: GET_BUSINESS_PLAN_HADER,
    payload: data,
  };
};

export const createBusinessPlanHaderAction = (data) => {
  return {
    type: CREATE_BUSINESS_PLAN_HADER,
    payload: data,
  };
};

import { API_URL } from "../constants";
import ApiClient from "../helpers/ApiClient";

// BUSINESS PLAN HEADER
const getBusinessPlanHeaderList = async () => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_BUSINESS_PLAN_HEADER_LIST}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getBusinessPlanHeaderSingle = async (planId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.POST_BUSINESS_PLAN_HEADER_SINGLE}/${planId}`
    );
    return response?.data ?? null;
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createBusinessPlanHeader = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_BUSINESS_PLAN_HEADER_CREATE}`,
      payload
    );
    if (response.success) return response.data;
    return null;
  } catch (err) {
    console.log("Create Error:", err);
  }
};

// END BUSINESS PLAN HEADER

// BUSINESS PLAN LINES

const getBusinessPlanLineList = async (planId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_BUSINESS_PLAN_LINE_LIST}?ppPlanId=${planId}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getBussinessPlanLineWithQuantityList = async (planId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_BUSINESS_PLAN_LINE_WITH_QUANTITY_LIST}?ppPlanId=${planId}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getStatesFromBussinessPlanLineList = async (planLineId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_STATES_FROM_BUSSINESS_PLAN_LINE_LIST}?PpPlanLineId=${planLineId}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createBusinessPlanLines = async (planId) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_CREATE_PLAN_LINES}?ppPlanId=${planId}`,
      {}
    );
    if (response.success) return response.success;
    return null;
  } catch (err) {
    console.log("Create Error:", err);
  }
};

const createBusinessPlanLine = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_CREATE_PLAN_LINE}`,
      payload
    );
    if (response.success) return response.data;
    return null;
  } catch (err) {
    console.log("Create Error:", err);
  }
};

const updateBusinessPlanLineCosting = async (payload) => {
  try {
    let response = await ApiClient.put(
      `${API_URL.POST_UPDATE_BUSSINESS_PLAN_LINE_COST}?ppplanLineId=${payload.ppPlanLinesId}`,
      payload
    );
    if (response.success) return response.data;
    return null;
  } catch (err) {
    console.log("Update Error:", err);
  }
};
// END BUSINESS PLAN LINES

// BUSINESS PLAN CYCLE
const getBusinessPlanLineCycleList = async (planLineId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_BUSINESS_PLAN_CYCLE_LIST}?ppPlanLinesId=${planLineId}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getUsedLandFromBusinessPlanCycle = async (planId, stateId, landType) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_USED_LAND_FROM_BUSINESS_PLAN_CYCLES}?ppplanId=${planId}&ddStateId=${stateId}&landType=${landType}`
    );
    return response?.data ?? null;
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createBusinessPlanCycles = async (planLineId) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_BUSINESS_CREATE_PLAN_CYCLES}?PPPlanId=${planLineId}`,
      {}
    );
    return response.success;
  } catch (err) {
    console.log("Create Error:", err);
  }
};

const createBusinessPlanCycle = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_BUSINESS_CREATE_PLAN_CYCLES}`,
      payload
    );
    if (response.success) return response.data;
    return null;
  } catch (err) {
    console.log("Create Error:", err);
  }
};

const updateBusinessPlanCycleQuantity = async (planCycleId, payload) => {
  try {
    let response = await ApiClient.put(
      `${API_URL.POST_UPDATE_BUSINESS_PLAN_CYCLE_QUANTITY}?ppPlanLinesCycleId=${planCycleId}`,
      payload
    );
    if (response.success) return response.data;
    return null;
  } catch (err) {
    console.log("Update Error:", err);
  }
};
// END BUSINESS PLAN CYCLE

export const BusinessService = {
  // BUSINESS PLAN HEADER
  getBusinessPlanHeaderList,
  getBusinessPlanHeaderSingle,
  createBusinessPlanHeader,

  // BUSINESS PLAN LINES
  getBusinessPlanLineList,
  getStatesFromBussinessPlanLineList,
  createBusinessPlanLines,
  createBusinessPlanLine,
  updateBusinessPlanLineCosting,
  getBussinessPlanLineWithQuantityList,

  // BUSINESS PLAN CYCLE
  getBusinessPlanLineCycleList,
  getUsedLandFromBusinessPlanCycle,
  createBusinessPlanCycles,
  createBusinessPlanCycle,
  updateBusinessPlanCycleQuantity,
};

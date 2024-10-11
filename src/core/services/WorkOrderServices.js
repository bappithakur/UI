import { API_URL } from "../constants";
import ApiClient from "../helpers/ApiClient";

const getWorkOrdersList = async (countryId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_WORK_ORDER_LIST}?ddCountryId=${countryId}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getWorkOrderSingle = async (workOrderId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_WORK_ORDER_SINGLE}/${workOrderId}`
    );
    return response?.data ?? null;
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createWorkOrder = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_WORK_ORDER_CREATE}`,
      payload
    );
    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create Error:", err);
  }
};

const createWorkOrderFarmerActitvity = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_WORK_ORDER_FARMER_ACTIVITY_CREATE}`,
      payload
    );
    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create Error:", err);
  }
};

const createWorkOrderSupervisorActitvity = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_WORK_ORDER_SUPERVISOR_ACTIVITY_CREATE}`,
      payload
    );
    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create Error:", err);
  }
};

const syncWorkOrderActivities = async (workOrderId, cropId) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_WORK_ORDER_ACTIVITIES_SYNC}?WO_WorkOrder_ID=${workOrderId}&CR_Crop_ID=${cropId}`,
      {}
    );
    if (response.success) return response.success;
    return null;
  } catch (err) {
    console.log("Create Error:", err);
  }
};

const getWorkOrderActivityList = async (workOrderId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_WORK_ORDER_ACTIVITY_LIST}?woWorkOrderId=${workOrderId}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getWorkOrderLine = async (workOrderId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_WORK_ORDER_LINE}?woWorkOrderId=${workOrderId}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createWorkOrderLine = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_WORK_ORDER_LINE}`,
      payload
    );
    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create error:", err);
  }
};

const getWorkOrderObservationList = async () => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_WORK_ORDER_OBSERVATION_LIST}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List err:", err);
  }
};

const getWorkOrderActivitiesList = async (workOrderId, userType) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_WORK_ORDER_ACTIVITIES_FROM_USER_TYPE_LIST}?woWorkOrderId=${workOrderId}&woWorkOrderId=${userType}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getUtilizedWorkOrderQuantity = async (planId, cropId, cropVarietyId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_UTILIZED_WORK_ORDER_QUANTITY}?ppPlanId=${planId}&crCropID=${cropId}&crCropVarietyID=${cropVarietyId}`
    );
    return response?.data ?? null;
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getWorkOrderDocumentStatus = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_WO_DOCUMENT_STATUS}`);
    return response?.data ?? null;
  } catch (err) {
    console.log("List Error:", err);
  }
};

const updateWorkOrderStatus = async (payload) => {
  try {
    let response = await ApiClient.put(`${API_URL.UPDATE_WO_STATUS}`, payload);
    if (response.success) return response.data;
    return null;
  } catch (err) {
    console.log("Create Error:", err);
  }
};

export const WorkOrderService = {
  getWorkOrdersList,
  getWorkOrderSingle,
  getWorkOrderActivityList,
  createWorkOrder,
  getWorkOrderLine,
  createWorkOrderLine,
  getWorkOrderObservationList,
  syncWorkOrderActivities,
  createWorkOrderFarmerActitvity,
  createWorkOrderSupervisorActitvity,
  getWorkOrderActivitiesList,
  getUtilizedWorkOrderQuantity,
  getWorkOrderDocumentStatus,
  updateWorkOrderStatus,
};

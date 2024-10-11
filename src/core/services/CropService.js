import { API_URL } from "../constants";
import ApiClient from "../helpers/ApiClient";

const getCropClassificationList = async () => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_CROP_CLASSIFICATION_LIST}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getCropSubClassificationList = async (classificationId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_CROP_SUB_CLASSIFICATION_LIST}?CrCropClassificationId=${classificationId}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getCropClassAndSubClassificationList = async (
  classificationId,
  subClassificationId
) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_CROP_CLASS_AND_SUBCLASS_LIST}?crCropClassificationId=${classificationId}&crCropSubClassificationId=${subClassificationId}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getCropCycleAreaList = async (id) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_CROP_CYCLE_AREA_LIST}?crCropCycleId=${id}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getCropList = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_CROP_LIST}`);

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getCropVarietyList = async (cropId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_CROP_VARIETY_LIST}?cropId=${cropId}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getStandardYield = async (countryId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_CROP_STANDARD_YEILD_LIST}?ddCountryId=${countryId}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getCropCycleList = async (
  countryId,
  cropId = null,
  cropVarietyId = null
) => {
  try {
    let params = `?DdCountryId=${countryId}`;
    params += cropId ? `&CrCropId=${cropId}` : "";
    params += cropVarietyId ? `&CrCropVarietyId=${cropVarietyId}` : "";

    const response = await ApiClient.get(
      `${API_URL.GET_CROP_CYCLE_LIST}${params}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getCropActivityList = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_CROP_ACTIVITY_LIST}`);

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createCropCycle = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.CREATE_CROP_CYCLE}`,
      payload
    );

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const createCropCycleArea = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.CREATE_CROP_CYCLE_AREA}`,
      payload
    );

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const getCropListByCountryId = async (countryId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_CROP_LIST_BY_COUNTRY_ID}?ddCountryId=${countryId}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List err:", err);
  }
};

const createCropStdYield = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.CREATE_CROP_STD_YIELD}`,
      payload
    );

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const createCropClassification = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.CREATE_CROP_CLASSIFICATION}`,
      payload
    );

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const createCropSubClassification = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.CREATE_CROP_SUB_CLASSIFICATION}`,
      payload
    );

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const createCrop = async (payload) => {
  try {
    let response = await ApiClient.post(`${API_URL.CREATE_CROP}`, payload);

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const createCropVariety = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.CREATE_CROP_VARIETY}`,
      payload
    );

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const createActivity = async (payload) => {
  try {
    let response = await ApiClient.post(`${API_URL.CREATE_ACTIVITY}`, payload);

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const createCropMilestone = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.CREATE_CROP_MILESTONE}`,
      payload
    );

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const getCropActivityListFromCountry = async (countryId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_CROP_ACTIVITY_FROM_COUNTRY_LIST}?ddCountryId=${countryId}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List err:", err);
  }
};

const getCropMilestoneList = async (countryId, cropId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_CROP_MILESTONE}?ddCountryId=${countryId}&crCropId=${cropId}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List err:", err);
  }
};

const createCropActivity = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.CREATE_CROP_ACTIVITY}`,
      payload
    );

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const getYieldFromCropVarietyState = async (cropId, cropVarietyId, stateId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_YIELD_FROM_CROP_VARIETY_STATE}?cropId=${cropId}&stateId=${stateId}&cropVarietyID=${cropVarietyId}`
    );

    return response?.data ?? null;
  } catch (err) {
    console.log("List err:", err);
  }
};

export const CropService = {
  getCropSubClassificationList,
  getCropClassificationList,
  getCropVarietyList,
  getCropList,
  getCropCycleAreaList,
  getCropClassAndSubClassificationList,
  getStandardYield,
  getCropCycleList,
  getCropActivityList,
  createCropCycle,
  createCropCycleArea,
  getCropListByCountryId,
  getCropActivityListFromCountry,
  createCropStdYield,
  createCropClassification,
  createCropSubClassification,
  createCrop,
  createCropVariety,
  createActivity,
  createCropMilestone,
  getCropMilestoneList,
  createCropActivity,
  getYieldFromCropVarietyState,
};

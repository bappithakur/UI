import { API_URL } from "../constants";
import ApiClient from "../helpers/ApiClient";

// LAND REGISTERATION
const getLandRegisterationFromCountryList = async (countryId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_LAND_REGISTERATION_FROM_COUNTRY_LIST}?countryId=${countryId}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getLandRegisterationSingle = async (langRegisterationId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_LAND_REGISTERATION_SINGLE}/${langRegisterationId}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getLandRegisterationFromCZSL = async (
  countryId,
  zoneId,
  stateId,
  landTypea
) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_LAND_REGISTERATION_FROM_CZSL}?DdCountryId=${countryId}&DdZoneId=${zoneId}&DdStateId=${stateId}&LandType=${landTypea}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createLandRegisteration = async (payload) => {
  try {
    let response = await ApiClient.post(
      API_URL.POST_LAND_REGISTERATION,
      payload
    );
    if (response.success) return response.data;
    return null;
  } catch (err) {
    console.log("Create Error:", err);
  }
};
// END LAND REGISTERATION

// BUSINESS PLAN LAND REGISTERATION
const getPlanLandList = async (id) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_BUSINESS_PLAN_LAND_LIST}?PPPlanId=${id}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createPlanLand = async (param) => {
  try {
    let response = await ApiClient.post(API_URL.POST_BUSINESS_PLAN_LAND, param);

    return response?.data ?? [];
  } catch (err) {
    console.log("Create Error:", err);
  }
};

const getFarmerDutiesList = async (landRegistrationId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_FARMER_DUTIES_LIST}?lnLandRegisterationId=${landRegistrationId}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getSupervisorDutiesList = async (landRegistrationId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_SUPERVISOR_DUTIES_LIST}?lnLandRegisterationId=${landRegistrationId}`
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getPlanLandDetails = async (id) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_PLAN_LAND_DETAIL}?PpPlanLandId=${id}`
    );

    console.log("details", response);
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getLandArea = async (countryId, zoneId, stateId, landType) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_SUM_OF_LAND_AREA}?ddCountryId=${countryId}&ddZoneId=${zoneId}&ddStateId=${stateId}&landType=${landType}`
    );
    return response?.data ?? null;
  } catch (err) {
    console.log("List error", err);
  }
};

const createFarmerDuties = async (param) => {
  try {
    const response = await ApiClient.post(API_URL.POST_FARMER_DUTIES, param);

    return response?.data ?? [];
  } catch (err) {
    console.log("Create Error:", err);
  }
};

const createSupervisorDuties = async (param) => {
  try {
    const response = await ApiClient.post(
      API_URL.POST_SUPERVISOR_DUTIES,
      param
    );

    return response?.data ?? [];
  } catch (err) {
    console.log("Create Error:", err);
  }
};
export const LandService = {
  // LAND REGISTRATION
  getLandRegisterationFromCountryList,
  getLandRegisterationSingle,
  getLandRegisterationFromCZSL,
  createLandRegisteration,
  getPlanLandList,
  createPlanLand,
  getPlanLandDetails,
  getFarmerDutiesList,
  getSupervisorDutiesList,
  getLandArea,
  createFarmerDuties,
  createSupervisorDuties,
};

import { API_URL } from "../constants";
import { Encryption } from "../helpers";
import ApiClient from "../helpers/ApiClient";

const getCountriesList = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_COUNTRIES_LIST}`);
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getZonesList = async (countryId) => {
  try {
    let params = { countryId: countryId };
    let response = await ApiClient.get(`${API_URL.GET_ZONE_LIST}`, {
      params,
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getStates = async (countryId, zone) => {
  try {
    let params = { countryId: countryId, zoneId: zone };
    let response = await ApiClient.get(`${API_URL.GET_STATES}`, {
      params,
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getFinancialYearsList = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_FINANCIAL_YEAR_LIST}`);
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getFinancialYearDates = async (yearId) => {
  try {
    let queryParams = { ddFinYearId: yearId };
    let response = await ApiClient.get(`${API_URL.GET_FINANCIAL_YEAR_DATES}`, {
      params: queryParams,
    });

    return response?.data[0] ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getUomList = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_UOM_LIST}`);

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createFinancialYear = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.POST_FINANCIAL_YEAR}`,
      payload
    );

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const getUserList = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_USER_LIST}`);

    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createUser = async (payload) => {
  try {
    const data = {
      ...payload,
      password: Encryption.encryptSHA512(payload.password),
    };

    let response = await ApiClient.post(`${API_URL.POST_USER}`, data);

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const resetPassword = async (payload) => {
  try {
    const data = {
      ...payload,
      newPassword: Encryption.encryptSHA512(payload.newPassword),
    };

    let response = await ApiClient.post(`${API_URL.RESET_PASSWORD}`, data);

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const createUom = async (payload) => {
  try {
    let response = await ApiClient.post(`${API_URL.POST_UOM}`, payload);

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

export const CoreService = {
  getCountriesList,
  getZonesList,
  getStates,
  getFinancialYearDates,
  getFinancialYearsList,
  getUomList,
  createFinancialYear,
  getUserList,
  createUser,
  resetPassword,
  createUom,
};

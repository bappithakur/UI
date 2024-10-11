import { API_URL } from "../constants";
import ApiClient from "../helpers/ApiClient";

const getBusinessPartnerList = async (countryId) => {
  try {
    let response = await ApiClient.get(
      `${API_URL.GET_BUSINESS_PARTNER_LIST}?countryId=${countryId}`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createFarmer = async (payload) => {
  try {
    let response = await ApiClient.post(`${API_URL.CREATE_FARMER}`, payload);

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

export const BusinessPartnerService = {
  getBusinessPartnerList,
  createFarmer,
};

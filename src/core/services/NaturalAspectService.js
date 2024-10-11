import { API_URL } from "../constants";
import ApiClient from "../helpers/ApiClient";

const getDiseaseList = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_DISEASE_LIST}`);
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const getInsectList = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_INSECT_LIST}`);
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createInsect = async (payload) => {
  try {
    let response = await ApiClient.post(`${API_URL.CREATE_INSECT}`, payload);

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

const createDisease = async (payload) => {
  try {
    let response = await ApiClient.post(`${API_URL.CREATE_DISEASE}`, payload);

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};
export const NaturalAspectService = {
  getDiseaseList,
  getInsectList,
  createInsect,
  createDisease,
};

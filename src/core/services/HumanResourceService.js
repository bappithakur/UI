import { API_URL } from "../constants";
import ApiClient from "../helpers/ApiClient";

const getHumanResourceMemberList = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_HR_MEMBER_LIST}`);
    return response?.data ?? [];
  } catch (err) {
    console.log("List Error:", err);
  }
};

const createSupervisor = async (payload) => {
  try {
    let response = await ApiClient.post(
      `${API_URL.CREATE_SUPERVISOR}`,
      payload
    );

    return response.success ? response.data : null;
  } catch (err) {
    console.log("Create err:", err);
  }
};

export const HumanResourceService = {
  getHumanResourceMemberList,
  createSupervisor,
};

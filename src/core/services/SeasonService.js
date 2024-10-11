import { API_URL } from "../constants";
import ApiClient from "../helpers/ApiClient";

const getSeasonsList = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_SEASON_LIST}`);

    return response?.data ?? [];
  } catch (err) {
    console.log("List err:", err);
  }
};

export const SeasonService = {
  getSeasonsList,
};

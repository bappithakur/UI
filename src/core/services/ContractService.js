import { API_URL } from "../constants";
import ApiClient from "../helpers/ApiClient";

const getLandContractList = async (countryId) => {
	try {
		let response = await ApiClient.get(`${API_URL.GET_LAND_CONTRACT_LIST}`);
		return response?.data ?? [];
	} catch (err) {
		console.log("List Error:", err);
	}
};

const getContractLineList = async (contractId) => {
	try {
		let response = await ApiClient.get(`${API_URL.GET_CONTRACT_LINE_LIST}?cnContractId=${contractId}`);
		return response?.data ?? [];
	} catch (err) {
		console.log("List Error:", err);
	}
};

export const ContactService = {
	getLandContractList,
	getContractLineList,
};

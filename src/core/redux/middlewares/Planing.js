import { put, takeLatest } from "redux-saga/effects";

import API_URL from "../../constants/url";
import ApiClient from "../../helpers/ApiClient";

import {
  CREATE_BUSINESS_PLAN_HADER,
  GET_BUSINESS_PLAN_HADER,
  SET_BUSINESS_PLAN_HADER,
  SET_LOADING,
} from "../constants";

function* getBusinessPlanHeader({ payload }) {
  console.log("getBusinessPlanHeader", payload);
  yield put({ type: SET_LOADING, payload: { isLoading: true } });

  try {
    let response;

    response = yield ApiClient.get(API_URL.GET_BUSINESS_PLAN_HEADER_LIST);

    console.log("res ==", response);

    yield put({ type: SET_BUSINESS_PLAN_HADER, payload: response });

    // if (response.success) {
    // } else {
    //   yield put({ type: SET_BUSINESS_PLAN_HADER, payload: {} });
    // }
  } catch (err) {
    console.log("Saga Error:", err);
  }

  yield put({ type: SET_LOADING, payload: { isLoading: false } });
}

function* createBusinessPlanHeader({ payload }) {
  console.log("create BusinessPlanHeader", payload);
  yield put({ type: SET_LOADING, payload: { isLoading: true } });

  try {
    let response;

    response = yield ApiClient.post(API_URL.POST_BUSINESS_PLAN_CREATE, payload);

    console.log("res ==>>>", response);

    if (response.success) {
      response = yield ApiClient.get(API_URL.GET_BUSINESS_PLAN_HEADER_LIST);

      yield put({ type: SET_BUSINESS_PLAN_HADER, payload: response });

      // if (response.success) {
      // } else {
      //   yield put({ type: SET_BUSINESS_PLAN_HADER, payload: {} });
      // }
    } else {
      yield put({ type: SET_BUSINESS_PLAN_HADER, payload: response });
    }
  } catch (err) {
    console.log("Saga Error:", err);
  }
  yield put({ type: SET_LOADING, payload: { isLoading: false } });
}

export default function* planingSaga() {
  yield takeLatest(GET_BUSINESS_PLAN_HADER, getBusinessPlanHeader);
  yield takeLatest(CREATE_BUSINESS_PLAN_HADER, createBusinessPlanHeader);
}

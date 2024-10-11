import { put, takeLatest } from "redux-saga/effects";

import { SET_DROPDOWN_OPTIONS, GET_DROPDOWN_OPTIONS } from "../constants";

function* getDropwdownOptions({ payload }) {
  yield put({ type: SET_DROPDOWN_OPTIONS, payload });
}

export default function* planingSaga() {
  yield takeLatest(GET_DROPDOWN_OPTIONS, getDropwdownOptions);
}

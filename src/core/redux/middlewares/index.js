import { fork, all } from "redux-saga/effects";

import authSaga from "./Auth";
import planingSaga from "./Planing";
import dropdownSaga from "./Dropdown";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(planingSaga), fork(dropdownSaga)]);
}

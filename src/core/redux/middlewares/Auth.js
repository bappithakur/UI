import { put, takeLatest } from "redux-saga/effects";
import { API_URL } from "../../constants";
import { LOCAL_STORAGE_KEYS } from "../../constants/constants";

import ApiClient from "../../helpers/ApiClient";
import { Encryption } from "../../helpers/Encryption";
import { LocalStorage } from "../../helpers/LocalStorage";

import {
  GET_LOGIN,
  GET_LOG_OUT,
  SET_LOADING,
  SET_LOGIN,
  SET_LOG_OUT,
} from "../constants";

function* getLogin({ payload }) {
  yield put({ type: SET_LOADING, payload: { isLoading: true } });

  try {
    let response;
    const { username, password } = payload;

    response = yield ApiClient.get(`${API_URL.GET_LOGIN_KEY}`);
    const seedKey = response.data;
    // const encryptedPassword = Encryption.encryptSHA512(password);
    // const finalPassword = Encryption.encryptSHA512(encryptedPassword + seedKey);
    const finalPassword = Encryption.doubleEncryptedPassword(password, seedKey);

    const data = {
      userName: username,
      passWord: finalPassword,
      seedKey: seedKey,
      ip: "127.0.0.1",
      mac: "1245dfdsfdf789",
      medium: "Web",
      browzer_Android_Version: "Chrome",
    };

    response = yield ApiClient.post(`${API_URL.POST_LOGIN}`, data);

    if (response.success) {
      const user = response.data;
      const profile = user.profile;
      LocalStorage.saveItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, user);
      LocalStorage.saveItem(LOCAL_STORAGE_KEYS.PROFILE_KEY, profile);

      yield put({
        type: SET_LOGIN,
        payload: { user: profile, isLoggedIn: true },
      });
    } else {
      yield put({ type: SET_LOGIN, payload: { user: {}, isLoggedIn: false } });
    }
  } catch (err) {
    console.log("Saga Error:", err);
  }

  yield put({ type: SET_LOADING, payload: { isLoading: false } });
}

function* logOut() {
  yield put({ type: SET_LOG_OUT, payload: {} });
}

export default function* authSaga() {
  yield takeLatest(GET_LOGIN, getLogin);
  yield takeLatest(GET_LOG_OUT, logOut);
}

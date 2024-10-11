import { API_URL, LOCAL_STORAGE_KEYS } from "../constants";
import ApiClient from "../helpers/ApiClient";
import { Encryption, LocalStorage } from "../helpers";

const GetLoginKey = async () => {
  try {
    let response = await ApiClient.get(`${API_URL.GET_LOGIN_KEY}`);
    return response;
  } catch (err) {
    console.log("Saga Error:", err);
  }
};

const PostLogin = async (payload) => {
  try {
    const { username, password } = payload;
    let response = await GetLoginKey();
    const seedKey = response.data;
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
    response = await ApiClient.post(`${API_URL.POST_LOGIN}`, data);
    if (response.success) {
      const user = response.data;

      LocalStorage.saveItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, user.userToken);
      LocalStorage.saveItem(
        LOCAL_STORAGE_KEYS.PROFILE_KEY,
        response.data.profile
      );
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("Saga Error:", err);
  }
};

const postChangePassword = async (payload) => {
  try {
    const { oldPassword, newPassword } = payload;

    let response = await GetLoginKey();

    const seedKey = response.data;

    const data = {
      oldPassword: Encryption.doubleEncryptedPassword(oldPassword, seedKey),
      newPassword: Encryption.encryptSHA512(newPassword),
      seedKey,
    };

    response = await ApiClient.post(`${API_URL.POST_CHANGE_PASSWORD}`, data);

    if (response.success) {
      const user = response.data;
      LocalStorage.saveItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, user.userToken);
      LocalStorage.saveItem(
        LOCAL_STORAGE_KEYS.PROFILE_KEY,
        response.data.profile
      );
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("Saga Error:", err);
  }
};

export const LoginService = { PostLogin, postChangePassword };

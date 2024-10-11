import Crypto from "crypto-js";

const encTokenName = "xuF,#^!ksmZU?eFTV(7LQ]6";

const encrypt = (value) => {
  return Crypto.AES.encrypt(value, encTokenName).toString();
};

const decrypt = (value) => {
  const bytes = Crypto.AES.decrypt(value, encTokenName);
  return bytes.toString(Crypto.enc.Utf8);
};

const encryptSHA512 = (str) => {
  return Crypto.SHA512(str).toString();
};

const doubleEncryptedPassword = (password, seedKey) => {
  return encryptSHA512(encryptSHA512(password) + seedKey);
};

export const Encryption = {
  encrypt,
  decrypt,
  encryptSHA512,
  doubleEncryptedPassword,
};

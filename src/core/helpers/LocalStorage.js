import { Encryption } from "./Encryption";

/**
 * Check if key exists in local storage
 * @param  string key
 * @return boolean
 */
const hasItem = (key) => {
  return localStorage.getItem(key) !== null;
};

/**
 * Retrive an object from local storage.
 * @param  string key
 * @return mixed
 */
const getItem = (key) => {
  const item = localStorage.getItem(key);

  if (!item) return;

  let itemResult = Encryption.decrypt(item);

  if (itemResult[0] === "{" || itemResult[0] === "[")
    return JSON.parse(itemResult);
  return itemResult;
};

/**
 * Save some value to local storage.
 * @param string key
 * @param string value
 */
const saveItem = (key, value) => {
  if (value === undefined) console.log("Can't store undefinded value");

  value = JSON.stringify(value);

  if (typeof value !== "string")
    console.log("Can't store unrecognized format value");

  const store = Encryption.encrypt(value);
  localStorage.setItem(key, store);
};

/**
 * Remove element from local storage.
 * @param string key
 */
const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const LocalStorage = {
  hasItem,
  getItem,
  saveItem,
  removeItem,
};

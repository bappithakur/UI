import { IS_LOADING } from "../constants";

export const setLogging = (isLoading) => {
  return {
    type: IS_LOADING,
    payload: { isLoading },
  };
};

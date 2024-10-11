import { SET_LOADING } from "../constants";

const initialData = {
  isLoading: false,
};

const LoadingReducer = (data = initialData, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { ...data, ...payload };
    default:
      return data;
  }
};

export default LoadingReducer;

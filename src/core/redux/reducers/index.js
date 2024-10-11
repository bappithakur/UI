import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import loadingReducer from "./LoadingReducer";
import planingReducer from "./PlaningReducer";
import dropdownReducer from "./DropdownReducer";

export default combineReducers({
  authReducer,
  loadingReducer,
  planingReducer,
  dropdownReducer,
});

import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducers";
import rootSaga from "./middlewares";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({ reducer, middleware: () => [sagaMiddleware] });
sagaMiddleware.run(rootSaga);
export default store;

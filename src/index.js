import "antd/dist/antd.min.css";

import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import store from "./core/redux/store";

// import "./assets/styles/theme/icons.min.css";
// import "./assets/styles/theme/bootstrap.min.css";
// import "./assets/styles/theme/app.min.css";
// import "./assets/styles/site.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

reportWebVitals();

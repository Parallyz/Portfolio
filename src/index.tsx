import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./assets/scss/style.scss";

import AppRouter from "./components/router/AppRouter";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

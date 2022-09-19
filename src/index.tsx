import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./js/redux/store";

import "~/assets/scss/main.scss";

import AppRouter from "./js/components/router/AppRouter";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

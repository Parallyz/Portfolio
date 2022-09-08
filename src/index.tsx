import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
import { store } from "./redux/store";

import "./scss/main.scss";

import AppRouter from "./components/app/AppRouter";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <AppRouter />
    <App />
  </Provider>
);

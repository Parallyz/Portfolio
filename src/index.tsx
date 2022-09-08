import  React from "react";
import './scss/main.scss';
import  ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import  App from "./components/App";
import { store } from "./redux/store";

const root  = ReactDOM.createRoot(document.querySelector("#root") as HTMLElement);

root.render(
  <Provider store={store}>
    <App />

  </Provider>
);

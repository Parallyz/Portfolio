import React from "react";

import ErrorPage from "../error/ErrorPage";
import Header from "../main/Header";

export const routes = [
  { path: "/", element: <Header />, exact: true },
  { path: "/head", element: <Header />, exact: true },

  { path: "*", element: <ErrorPage />, exact: false },
];

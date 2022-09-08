import React from "react";
import App from "../App";

import  ErrorPage from "../error/ErrorPage";
import  Header from "../main/Header";




export const routes = [
  { path: "/", element: <App /> },
  { path: "/head", element: <Header /> },

  { path: "*", element: <ErrorPage /> },
];

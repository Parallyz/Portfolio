import React from "react";

import  ErrorPage from "../error/ErrorPage";
import  Header from "../main/Header";




export const routes = [
  { path: "/", element: <Header /> },
  { path: "/head", element: <Header /> },

  { path: "*", element: <ErrorPage /> },
];

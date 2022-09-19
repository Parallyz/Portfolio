import React from "react";
import { AdminPanel } from "../admin/AdminPanel";
import App from "../App";

import ErrorPage from "../error/ErrorPage";
import Header from "../main/Header";

export const publicRoutes = [
  { path: "/", element: <App /> },
  { path: "/head", element: <Header /> },

  { path: "*", element: <ErrorPage /> },
];

export const privateRoutes = [
  { path: "/", element: <App /> },
  { path: "/admin", element: <AdminPanel /> },

  { path: "*", element: <ErrorPage /> },
];

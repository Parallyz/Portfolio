import React from "react";
import { adminPath } from "../../models/models";

import { AdminPanel } from "../admin/AdminPanel";
import Overview from "../admin/pages/overview/Overview";
import Settings from "../admin/pages/settings/Settings";
import Tickets from "../admin/pages/tickets/Tickets";
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

export const adminRoutes: adminPath[] = [
  {
    path: "/",
    element: <Overview />,
    name: "overview",
    icon: "./assets/img/svg/overview.svg",
  },
  {
    path: "/settings",
    element: <Settings />,
    name: "settings",
    icon: "./assets/img/svg/settings.svg",
  },
  {
    path: "/tickets",
    element: <Tickets />,
    name: "tickets",
    icon: "./assets/img/svg/tickets.svg",
  },

  { path: "*", element: <ErrorPage /> },
];

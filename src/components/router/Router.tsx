import React from "react";
import { adminPath } from "../../models/models";

import Overview from "../admin/pages/overview/Overview";
import Settings from "../admin/pages/settings/Settings";
import Tickets from "../admin/pages/tickets/Tickets";
import App from "../App";

import ErrorPage from "../error/ErrorPage";
import Header from "../main/Header";


const PATH_SVG = "/assets/img/admin/svg/";

export const publicRoutes = [
  { path: "/", element: <App /> },
  { path: "/head", element: <Header /> },

  { path: "*", element: <ErrorPage /> },
];

export const privateRoutes = [
  { path: "/", element: <App /> },

  { path: "*", element: <ErrorPage /> },
];



export const adminRoutes: adminPath[] = [
  {
    path: "/",
    element: <Overview />,
    name: "overview",
    icon: `${PATH_SVG}overview.svg`,
  },
  {
    path: "/settings",
    element: <Settings />,
    name: "settings",
    icon: `${PATH_SVG}settings.svg`,
  },
  {
    path: "/tickets",
    element: <Tickets />,
    name: "tickets",
    icon: `${PATH_SVG}tickets.svg`,
  },

  { path: "*", element: <ErrorPage /> },
];

import React from "react";

import App from "../App";

import ErrorPage from "../error/ErrorPage";
import Header from "../main/Header";
import { adminPath } from "../../models/models";

import Overview from "../admin/pages/overview/Overview";
import Settings from "../admin/pages/settings/Settings";
import Tickets from "../admin/pages/tickets/Tickets";
import Users from "../admin/pages/users/Users";

export const publicRoutes = [
  { path: "/", element: <App /> },
  { path: "/head", element: <Header /> },

  { path: "*", element: <ErrorPage /> },
];

export const privateRoutes = [
  { path: "/", element: <App /> },

  { path: "*", element: <ErrorPage /> },
];

import imgSetting from "../../assets/img/admin/svg/settings.svg";
import imgOverview from "../../assets/img/admin/svg/overview.svg";
import imgTickets from "../../assets/img/admin/svg/tickets.svg";
import imgUsers from "../../assets/img/admin/svg/contacts.svg";

export const adminRoutes: adminPath[] = [
  {
    path: "/overview",
    element: <Overview />,
    name: "Overview",
    icon: imgOverview,
  },

  {
    path: "/tickets",
    element: <Tickets />,
    name: "Tickets",
    icon: imgTickets,
  },
  {
    path: "/users",
    element: <Users />,
    name: "Users",
    icon: imgUsers,
  },
  {
    path: "/settings",
    element: <Settings />,
    name: "Settings",
    icon: imgSetting,
  },
];

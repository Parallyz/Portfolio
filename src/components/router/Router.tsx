import Overview from "../admin/pages/overview/Overview";
import React from "react";
import Settings from "../admin/pages/settings/Settings";
import UsersPage from "../admin/pages/users/UsersPage";
import { adminPath } from "../../models/utils.model";
import imgOverview from "../../assets/img/admin/svg/overview.svg";
import imgSetting from "../../assets/img/admin/svg/settings.svg";
import imgUsers from "../../assets/img/admin/svg/contacts.svg";

export const adminRoutes: adminPath[] = [
  {
    path: "/overview",
    element: <Overview />,
    name: "Overview",
    icon: imgOverview,
  },

  {
    path: "/users",
    element: <UsersPage />,
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

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AdminSideMenu } from "../admin/sideMenu/AdminSideMenu";
import ErrorPage from "../error/ErrorPage";
import React from "react";
import { adminPath } from "../../models/utils.model";
import { adminRoutes } from "./Router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AdminSideMenu>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          {adminRoutes.map((route: adminPath) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </AdminSideMenu>
    </BrowserRouter>
  );
};

export default AppRouter;

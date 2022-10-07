import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { adminPath } from "../../models/models";
import { AdminSideMenu } from "../admin/sideMenu/AdminSideMenu";
import ErrorPage from "../error/ErrorPage";
import { adminRoutes } from "./Router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      {/*<Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} element={route.element} path={route.path} />
        ))}
      </Routes>*/}

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

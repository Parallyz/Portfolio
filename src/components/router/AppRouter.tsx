import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { adminPath } from "../../models/models";
import { AdminSideMenu } from "../admin/SideMenu/AdminSideMenu";
import { adminRoutes, publicRoutes } from "./Router";

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
          {adminRoutes.map((route: adminPath) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </AdminSideMenu>
    </BrowserRouter>
  );
};

export default AppRouter;

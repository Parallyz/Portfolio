import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminPath } from "../../models/models";
import { adminRoutes } from "./Router";

const AdminRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {adminRoutes.map((route:adminPath) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRouter;

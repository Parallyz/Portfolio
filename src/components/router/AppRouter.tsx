import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./Router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} element={route.element} path={route.path} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

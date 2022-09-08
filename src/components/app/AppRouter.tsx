import  React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./Router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            element={route.element}
            path={route.path}
    
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

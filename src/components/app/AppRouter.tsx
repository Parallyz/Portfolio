import  React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { routes } from "./Router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Link to="/head">Test</Link>
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

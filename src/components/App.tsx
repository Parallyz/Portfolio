import React from "react";

import AppRouter from "./router/AppRouter";
import MarketStore from "./market/Market";
import { AdminPanel } from "./admin/AdminPanel";

const App = () => {
  return (
    <>
      {/*<MarketStore/>*/}
      <AdminPanel/>
    </>
  );
};

export default App;

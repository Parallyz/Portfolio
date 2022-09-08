import React from "react";

import AppRouter from "./app/AppRouter";
import MarketStore from "./store/Store";

const App = () => {
  return (
    <>
      <AppRouter />
      <MarketStore/>
    </>
  );
};

export default App;

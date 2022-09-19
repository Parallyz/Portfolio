import React from "react";

import Header from "../main/Header";
import Loader from "../modal/Loader";
import Products from "./Products/Products";
function MarketStore() {
  return (
    <>
      <Header />
      <Products />
    </>
  );
}

export default MarketStore;

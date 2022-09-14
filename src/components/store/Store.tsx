import React from "react";
import { useAppSelector} from "../../redux/store";
import Header from "../main/Header";
import Loader from "../modal/Loader";
import ProductList from "./ProductList/ProductList";
function MarketStore() {


  return (
    <>
        <Header />
        <ProductList />
      
    </>
  );
}

export default MarketStore;

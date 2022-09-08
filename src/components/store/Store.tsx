import React from "react";
import { useAppSelector} from "../../hooks/redux";
import Header from "../main/Header";
import Loader from "../modal/Loader";
import ProductList from "./ProductList/ProductList";
function MarketStore() {

   const isLoader = useAppSelector(store => store.app.isLoader);

  return (
    <>
        <Header />
        <ProductList />
        {isLoader && <Loader/>}
    </>
  );
}

export default MarketStore;

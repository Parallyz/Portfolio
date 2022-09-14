import React, { useEffect, useState } from "react";



import { IProductItem } from "../../../models/models";
import { useLazyGetProductsQuery } from "../../../redux/market/market.api";

import Loader from "../../modal/Loader";

import ProductItem from "./ProductItem";

function ProductList() {
  
  const [fetchProducts,{isError,isLoading,data: productList}] = useLazyGetProductsQuery();


 

  useEffect(() => {
    console.log("Prod list effect");
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      {productList?.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </>
  );
}

export default ProductList;

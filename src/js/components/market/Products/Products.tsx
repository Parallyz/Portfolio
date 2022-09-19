import React, { useEffect, useState } from "react";

import { IProductItem } from "../../../models/models";
import { useLazyGetProductsQuery } from "../../../redux/market/market.api";

import Loader from "../../modal/Loader";

import ProductItem from "./ProductItem";
import { ProductList } from "./ProductList";

function Products() {
  const [fetchProducts, { isError, isLoading, data: productList }] =
    useLazyGetProductsQuery();

  useEffect(() => {
    console.log("Prod list effect");
    fetchProducts();
  }, []);

  return <>{isLoading ? <Loader /> : <ProductList list={productList} />}</>;
}

export default Products;

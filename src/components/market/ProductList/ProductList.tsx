import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../../redux/store";

import { IProductItem } from "../../../models/models";
import { fetchProducts } from "../../../redux/market/API/market.api";
import Loader from "../../modal/Loader";

import ProductItem from "./ProductItem";

function ProductList() {
  const [productItems, SetproductItems] = useState<IProductItem[]>([]);
  const dispatch = useAppDispatch();
  const getproductItems = useAppSelector<IProductItem[]>(
    (state) => state.store.productList
  );
  const isLoading = useAppSelector<boolean>((state) => state.store.loading);
  const error = useAppSelector<string>((state) => state.store.error);

  useEffect(() => {
    console.log("Prod list effect");

    dispatch(fetchProducts());

    console.log(getproductItems);
  }, []);

  return (
    <>
      {/*{isLoading && <Loader />}*/}
      {error && <p>Error</p>}
      {productItems.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </>
  );
}

export default ProductList;

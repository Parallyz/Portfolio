import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { useFetching } from "../../../hooks/useFetching";
import { IProductItem } from "../../../models/models";
import { fetchProducts } from "../../../redux/reducers/storeReducer";
import Loader from "../../modal/Loader";

import { storeApi } from "../API/storeApi";
import ProductItem from "./ProductItem";

function ProductList() {
  const [productItems, SetproductItems] = useState<IProductItem[]>([]);
  const dispatch = useAppDispatch();
  const getproductItems = useAppSelector<IProductItem[]>(state=>state.store.productList);


  const [fetchDataProducts, isLoading, error] = useFetching(async () => {
    console.log("Prod list fetching");

  //  const data = await storeApi.fetchAllProducts();
  
    dispatch( fetchProducts());
  
   
  });

  useEffect(() => {
    console.log("Prod list effect");

    fetchDataProducts();

      console.log(getproductItems);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {productItems.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </>
  );
}

export default ProductList;

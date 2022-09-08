import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { useFetching } from "../../../hooks/useFetching";
import { IProductItem } from "../../../models/models";
import { hideLoader, showLoader } from "../../../redux/reducers/appReducer";

import { StoreService } from "../services/storeService";
import ProductItem from "./ProductItem";

function ProductList() {
  const [productItems, SetproductItems] = useState<IProductItem[]>([]);

  const dispatch = useAppDispatch();

  const [fetchProducts, isLoading, error] = useFetching(async () => {
    console.log("Prod list fetching");

    const data = await StoreService.fetchAllProducts();

    SetproductItems(data.data);
    dispatch(hideLoader());
  });

  const isLoader = useAppSelector((state) => state.app.isLoader);

  useEffect(() => {
    console.log("Prod list effect");

    dispatch(showLoader());
    fetchProducts();
  }, []);

  return (
    <>
      ShopList
      {productItems.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </>
  );
}

export default ProductList;

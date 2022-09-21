import React from "react";
import { IProductItem } from "../../../models/models";
import ProductItem from "./ProductItem";

type ProductListProps = {
  list: IProductItem[];
};

export function ProductList({ list }: ProductListProps) {
  return (
    <>
      {list?.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </>
  );
}

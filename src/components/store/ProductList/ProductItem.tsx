import React, { useState } from "react";
import { IProductItem } from "../../../models/models";

interface ProductItemProps {
  item: IProductItem;
}

const ProductItem = ({ item }: ProductItemProps) => {
  return (
    <div className="product__card card">
    
      
      <div className="card__image">
        <img data-src={item.image} alt={item.title}></img>
      </div>
      <h3 className="card__title">{item.title}</h3>
      <span className="card__category">{item.category}</span>
      <span className="card__price">{item.price}</span>
    </div>
  );
};

export default ProductItem;

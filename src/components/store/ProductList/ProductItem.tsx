import React, { useState } from "react";
import { IProductItem } from "../../../models/models";

interface ProductItemProps {
  item: IProductItem;
}

const ProductItem = (props: ProductItemProps) => {
  const [details, setDetails] = useState(false);

  const btnBgClassName = details ? "black-bg" : "white-bg";

  const btnClasses = ["btg-white input black-input", btnBgClassName];

  return (
    <div>
      {details && (
        <button className={btnClasses.join(" ")}>Show Details</button>
      )}
    </div>
  );
};

export default ProductItem;

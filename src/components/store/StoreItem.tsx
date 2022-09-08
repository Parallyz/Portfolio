import React, { useState } from "react";
import { IShopItem } from "../../models/models";

interface ShopItemProps {
  item: IShopItem;
}

const ShopItem = (props: ShopItemProps) => {
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

export default ShopItem;

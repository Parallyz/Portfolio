import React, { useEffect, useState } from "react";
import { IShopItem } from "../../models/models";
//import { StoreService } from "./services/storeService";

function ShopList() {
  const [shopItems, SetshopItems] = useState<IShopItem[]>([]);

  useEffect(() => {
   // StoreService.fetchAllProducts().then((response) => {
   //   SetshopItems(response.data);
   // });
  }, []);

  return <></>;
}

export default ShopList;

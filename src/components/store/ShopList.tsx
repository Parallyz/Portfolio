import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { IShopItem } from "../../models/models";
import Loader from "../modal/Loader";
//import { StoreService } from "./services/storeService";

function ShopList() {
  const [shopItems, SetshopItems] = useState<IShopItem[]>([]);

  const isLoader = useAppSelector((state) => state.app.isLoader);
  useEffect(() => {
    // StoreService.fetchAllProducts().then((response) => {
    //   SetshopItems(response.data);
    // });
  }, []);

  return (
    <>
      ShopList
      {isLoader && <Loader />}
    </>
  );
}

export default ShopList;

import { IShopItem } from './../../../models/models';
import axios from "axios";



 export class StoreService {
  static async fetchAllProducts() {
    return await axios.get<IShopItem[]>(storeUrl.shopItems);
  }

//  static async fetchProductByID(id:number) {
//     return await axios.get<IShopItem>(storeUrl.shopItems, {
//       _id:id
//    });
//  }
}
import { IProductItem } from "../../../models/models";
import axios from "axios";
import { storeUrl } from "../../../models/path";

export class storeApi {
  public static async fetchAllProducts() {
    return await axios.get(storeUrl.products);
  }
}
////  static async fetchProductByID(id:number) {
////     return await axios.get<IShopItem>(storeUrl.shopItems, {
////       _id:id
////    });
////  }
//}

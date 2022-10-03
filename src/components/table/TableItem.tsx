import React from "react";
import { User } from "../../models/models";

interface TableItemProps<T> {
  item: T;
}
const TableItem = <T extends unknown>({ item }: TableItemProps<T>) => {
  return <></>;
};

export default TableItem;

//class UserItem  extends  TableItem<User> ()=>{
//   return <></>;
//}

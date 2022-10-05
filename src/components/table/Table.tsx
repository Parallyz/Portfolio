import React, { ReactElement, useEffect, useState } from "react";
import { userSortKeys } from "../../models/models";
import TableHeaderTab from "./TableHeaderTab";
import Sort from "../../assets/img/admin/svg/sort.svg";
import UserItem from "../admin/pages/users/UserItem";

//type TableItemProps<T> = {
//  item: T;
//};

interface TableProps<T> {
  data: Array<T>;
  keyExtractor: (item: T) => string;
  tableHeaders: Array<string>;
  isSortIncrise: boolean;
  //TableComponent: React.ComponentType<TableItemProps<T>>;
  //TableList: JSX.Element;
  indexSelectedTableHeader: number;
  sortHandler: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

const Table = <T extends unknown>({
  //TableComponent,
  ...props
}: TableProps<T>) => {
  return (
    <>
      <div className="header">
        {props.tableHeaders?.map((item, index) => (
          <TableHeaderTab
            key={index}
            name={item}
            index={index}
            img={Sort}
            isIncrise={props.isSortIncrise}
            isActive={props.indexSelectedTableHeader === index}
            clickEvent={props.sortHandler}
          />
        ))}
      </div>
      <div className="table__list">
        {props.data?.map((item: T) => (
          //<TableComponent item={item} key={props.keyExtractor(item)} />
          <UserItem item={item} key={props.keyExtractor(item)} />
        ))}
        {/*{props.TableList}*/}
      </div>
    </>
  );
};

export default Table;

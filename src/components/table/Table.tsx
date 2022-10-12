import React, { ReactElement, useEffect, useState } from "react";

import Sort from "../../assets/img/admin/svg/sort.svg";
import TableHeaderTab from "./TableHeaderTab";
import UserItem from "../admin/pages/users/UserItem";
import { userSortKeys } from "../../models/models";

//type TableItemProps<T> = {
//  item: T;
//};

interface TableProps<T> {
  //data: Array<T>;
  //keyExtractor: (item: T) => string;
  tableHeaders: Array<string>;
  isSortIncrease: boolean;
  //TableComponent: React.ComponentType<TableItemProps<T>>;
  TableList: JSX.Element;
  indexSelectedTableHeader: number;
  sortHandler: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

const Table = <T extends unknown>({
  //TableComponent,
  ...props
}: TableProps<T>) => {
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr className="header">
          {props.tableHeaders?.map((item, index) => (
            <TableHeaderTab
              key={index}
              name={item}
              index={index}
              img={Sort}
              isIncrease={props.isSortIncrease}
              isActive={props.indexSelectedTableHeader === index}
              clickEvent={props.sortHandler}
            />
          ))}
        </tr>
      </thead>
      <tbody className="table__list">
        {/*{props.data?.map((item: T) => (
          //<TableComponent item={item} key={props.keyExtractor(item)} />
          <UserItem item={item} key={props.keyExtractor(item)} />
        ))}*/}
        {props.TableList}
      </tbody>
    </table>
  );
};

export default Table;

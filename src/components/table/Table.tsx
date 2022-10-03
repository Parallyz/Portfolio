import React, { ReactElement, useEffect, useState } from "react";
import { userSortKeys } from "../../models/models";
import Loader from "../modal/Loader";
import TableHeaderTab from "./TableHeaderTab";
import Sort from "../../assets/img/admin/svg/sort.svg";
import UserItem from "../admin/pages/users/UserItem";

type TableItemProps<T> = {
  item: T;
};

interface TableProps<T> {
  isLoading: Boolean;
  isError?: string;
  data: Array<T>;
  keyExtractor: (item: T) => string;
  tableHeaders: Array<string>;
  isSortIncrise: boolean;
  //TableComponent: React.ComponentType<TableItemProps<T>>;

  indexSelectedTableHeader: number;
  sortHandler: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

const Table = <T extends unknown>({
  //TableComponent,
  ...props
}: TableProps<T>) => {
  return (
    <div className="users__list">
      {props.isLoading ? (
        <Loader />
      ) : (
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

          {props.data?.map((item: T) => (
            //<TableComponent item={item} key={props.keyExtractor(item)} />
            <UserItem user={item} key={props.keyExtractor(item)} />
          ))}
        </>
      )}
    </div>
  );
};

export default Table;

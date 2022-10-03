import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../../hooks/debounce";
import { useAppSelector } from "../../../../hooks/redux";
import { User, userSortKeys } from "../../../../models/models";
import {
  useLazyGetUsersQuery,
  useLazySearchUsersQuery,
} from "../../../../redux/user/user.api";
import { sortedArray } from "../../../../utils/sortArray";
import ButtonPagintation from "../../../table/pagintation/ButtonPagintation";
import Table from "../../../table/Table";
import TableHeader from "../../../table/TableHeader";

const UserTable = () => {
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedHeader, setSelectedHeader] = useState<number>(-1);
  const [isSortOrderInc, setIsSortOrderInc] = useState<boolean>(true);

  const debounceLimit = useDebounce(perPage, 1000);

  const { searchUserField } = useAppSelector((state) => state.users);

  const [
    fetchSearchUsers,
    {
      isError: fetchsearchUsersError,
      isLoading: fetchSearchUsersLoading,
      data: fetchUserSearchList,
    },
  ] = useLazySearchUsersQuery();

  const [
    fetchUsers,
    {
      isError: fetchUsersError,
      isLoading: fetchUsersLoading,
      data: fetchUserList,
    },
  ] = useLazyGetUsersQuery();

  const loadUsersCallback = useCallback(() => {
    console.log("Callback");

    //const _limit =
    //  (currentPage - 1) * perPage > total
    //    ? total - (currentPage - 1) * perPage
    //    : perPage;

    //const _skip =
    //  (currentPage - 1) * perPage > total
    //    ? total - _limit
    //    : (currentPage - 1) * perPage;
    if (!fetchUserSearchList?.users)
      fetchUsers({ skip: (currentPage - 1) * perPage, limit: perPage });

    //fetchUsers({ skip: _skip, limit: _limit });
  }, [debounceLimit, currentPage]);

  const searchUsersCallback = useCallback(() => {
    if (searchUserField) {
      fetchSearchUsers(searchUserField);
    }
  }, [searchUserField]);

  //? Users total count
  useEffect(() => {
    if (!fetchUsersLoading && fetchUserList?.users)
      setTotal(fetchUserList?.total);
    if (!fetchSearchUsersLoading && fetchUserSearchList?.users) {
      setTotal(fetchUserSearchList?.users.length);
      if (total < perPage) {
        setPerPage(total);
      }
    }
  }, [fetchSearchUsersLoading, total, perPage, fetchUsersLoading]);

  //? Users-load
  useEffect(() => {
    if (!fetchUsersLoading && fetchUserList?.users) {
      setUserData(fetchUserList?.users);
    }
    if (!fetchSearchUsersLoading && fetchUserSearchList?.users) {
      setUserData(fetchUserSearchList?.users);
    }
  }, [
    fetchSearchUsersLoading,
    fetchUsersLoading,
    fetchUserList?.users,
    fetchUserSearchList?.users,
  ]);

  //? Limit change load
  useEffect(() => {
    if (searchUserField) {
      searchUsersCallback();
    }
    if (debounceLimit && !searchUserField) {
      loadUsersCallback();
    }
  }, [debounceLimit, currentPage, searchUserField]);

  //const sortData = useCallback(
  //  (sortedField: string, orderByIncrement: boolean = true) => {
  //    setUserData(
  //      sortedArray(userData, userSortKeys[sortedField], orderByIncrement)
  //    );
  //  },
  //  [userData]
  //);

  const getPagintationInfoString = (): string => {
    return `${(currentPage - 1) * perPage} - ${
      currentPage * perPage > total ? total : currentPage * perPage
    } of ${total}`;
  };

  const perPageHandler = (e: React.FormEvent<HTMLInputElement>) => {
    let parsed = parseInt(e?.currentTarget?.value);
    if (!isNaN(parsed) && parsed > 0) {
      let { min, max } = e.currentTarget;
      if (!isNaN(parseInt(max)) && parsed > parseInt(max)) {
        setPerPage(parseInt(max));
      } else if (!isNaN(parseInt(min)) && parsed < parseInt(min)) {
        setPerPage(parseInt(min));
      } else {
        setPerPage(parsed);
      }
      setCurrentPage(1);
    }
  };

  const changePageHandler = (newPage: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage(newPage);
  };

  const sortHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const field: string = e.currentTarget.innerText;
    if (userSortKeys[field]) {
      if (selectedHeader === index && isSortOrderInc) {
        setIsSortOrderInc(false);

        setUserData(sortedArray(userData, userSortKeys[field], false));
        //  sortData(field, false);
      } else {
        setIsSortOrderInc(true);
        // sortData(field);
        setSelectedHeader(index);
        setUserData(sortedArray(userData, userSortKeys[field]));
      }
    }
  };

  return (
    <div className="table">
      <TableHeader title={"Users"} />
      <Table<User>
        isLoading={fetchSearchUsersLoading}
        data={userData}
        tableHeaders={Object.keys(userSortKeys)}
        keyExtractor={({ id }) => id.toString()}
        isSortIncrise={isSortOrderInc}
        indexSelectedTableHeader={selectedHeader}
        sortHandler={sortHandler}
        //TableComponent={UserItem}
      />
      <div className="table__pagination pagination">
        <div className="pagination__limit">
          Rows per page:
          <input
            type="number"
            value={perPage}
            max={"20"}
            min={"1"}
            disabled={currentPage * perPage >= total}
            onChange={(e) => {
              perPageHandler(e);
            }}
          />
        </div>
        <div className="pagination__pages">
          <div>{getPagintationInfoString()}</div>
          <div className="pagination__arrows">
            <ButtonPagintation
              disabled={currentPage < 2}
              onClick={() => changePageHandler(currentPage - 1)}
              img={"./assets/img/admin/svg/arrow-left.svg"}
            />
            <ButtonPagintation
              disabled={currentPage * perPage >= total}
              onClick={() => changePageHandler(currentPage + 1)}
              img={"./assets/img/admin/svg/arrow-left.svg"}
              isMirroredImg={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;

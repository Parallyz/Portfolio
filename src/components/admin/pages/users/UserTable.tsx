import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppActions } from "../../../../hooks/actions";
import { useDebounce } from "../../../../hooks/debounce";
import { useAppSelector } from "../../../../hooks/redux";
import { User, userSortKeys } from "../../../../models/models";
import {
  useLazyGetUsersQuery,
  useLazySearchUsersQuery,
} from "../../../../redux/user/user.api";
import { sortedArray } from "../../../../utils/sortArray";
import Loader from "../../../loader/Loader";
import ButtonPagintation from "../../../table/pagintation/ButtonPagintation";
import Table from "../../../table/Table";
import TableHeader from "../../../table/TableHeader";
import UserList from "./UserList";

const UserTable = () => {
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedHeader, setSelectedHeader] = useState<number>(-1);
  const [isSortOrderInc, setIsSortOrderInc] = useState<boolean>(true);

  const debounceLimit = useDebounce(perPage, 1000);

  const { searchUserField } = useAppSelector((state) => state.users);

  const { showAlert: showError } = useAppActions();

  const [
    fetchSearchUsers,
    {
      isError: isSearchUsersError,
      isLoading: isSearchUsersLoading,
      data: dataUserSearchList,
    },
  ] = useLazySearchUsersQuery();

  const [
    fetchUsers,
    { isError: isUsersError, isLoading: isUsersLoading, data: dataUserList },
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
    //  if (userData.length === 0)
    fetchUsers({ skip: (currentPage - 1) * perPage, limit: perPage });

    //fetchUsers({ skip: _skip, limit: _limit });
  }, [debounceLimit, currentPage, userData]);

  const loadUsers = () => {
    console.log("Load func");

    if (userData.length === 0)
      fetchUsers({ skip: (currentPage - 1) * perPage, limit: perPage });
  };

  const searchUsersCallback = useCallback(() => {
    if (searchUserField) {
      fetchSearchUsers(searchUserField);
    }
  }, [searchUserField]);

  //? Users total count
  useEffect(() => {
    if (!isUsersLoading && dataUserList?.users && !searchUserField) {
      setTotal(dataUserList?.total);
    }
    //if (!isSearchUsersLoading && dataUserSearchList?.users) {
    //  setTotal(dataUserSearchList?.users.length);
    //  if (total < perPage) {
    //    setPerPage(total);
    //  }
    //}
  }, [
    isSearchUsersLoading,
    total,
    perPage,
    isUsersLoading,
    dataUserList?.users,
  ]);

  useEffect(() => {
    console.log("Loading", isUsersLoading);
  }, [isUsersLoading]);

  //? Users-load
  useEffect(() => {
    console.log("User Loading", isUsersLoading);
    console.log("User Loading", dataUserList?.users);

    if (!isUsersLoading && dataUserList?.users) {
      //&& !searchUserField) {
      setUserData(dataUserList?.users);
    }
    if (!isSearchUsersLoading && dataUserSearchList?.users) {
      setUserData(dataUserSearchList?.users);
    }
  }, [isSearchUsersLoading, isUsersLoading, dataUserList?.users]);

  //? On page load
  useEffect(() => {
    //if (searchUserField) {
    //  searchUsersCallback();
    //}

    if (debounceLimit && !searchUserField) {
      loadUsersCallback();
    }
  }, [debounceLimit, currentPage, searchUserField]);

  //? Error
  useEffect(() => {
    if (isUsersError) {
      showError("Error on load");
    }
  }, [isUsersError]);

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
        if (userData)
          setUserData(sortedArray(userData, userSortKeys[field], false));
        //  sortData(field, false);
      } else {
        setIsSortOrderInc(true);
        // sortData(field);
        setSelectedHeader(index);
        if (userData) setUserData(sortedArray(userData, userSortKeys[field]));
      }
    }
  };

  return (
    <div className="table">
      <TableHeader title={"Users"} />
      {isUsersLoading && !isUsersError ? (
        <Loader />
      ) : (
        <>
          <Table
            data={userData}
            tableHeaders={Object.keys(userSortKeys)}
            keyExtractor={({ id }) => id.toString()}
            isSortIncrise={isSortOrderInc}
            indexSelectedTableHeader={selectedHeader}
            sortHandler={sortHandler}
            //TableList={<UserList data={userData} />}
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
        </>
      )}
    </div>
  );
};

export default UserTable;

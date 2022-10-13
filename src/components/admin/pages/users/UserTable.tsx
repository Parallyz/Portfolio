import { AlertType, User, userSortKeys } from "../../../../models/models";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useLazyGetUsersQuery,
  useLazySearchUsersQuery,
} from "../../../../redux/user/user.api";

import ButtonPagination from "../../../table/pagination/ButtonPagintation";
import Loader from "../../../loader/Loader";
import Table from "../../../table/Table";
import TableHeader from "../../../table/TableHeader";
import UserList from "./UserList";
import { sortedArray } from "../../../../utils/sortArray";
import { useAppActions } from "../../../../hooks/actions";
import { useAppSelector } from "../../../../hooks/redux";
import { useDebounce } from "../../../../hooks/debounce";

const UserTable = () => {
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedSortingHeader, setSelectedSortingHeader] =
    useState<number>(-1);
  const [isSortOrderInc, setIsSortOrderInc] = useState<boolean>(true);

  const debouncePerPage = useDebounce(perPage, 1000);

  const { searchUserField } = useAppSelector((state) => state.users);

  const { setStateAlert: showAlert } = useAppActions();

  const [fetchSearchUsers, fetchSearchUsersResponse] =
    useLazySearchUsersQuery();

  const [fetchUsers, fetchUsersResponse] = useLazyGetUsersQuery();

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
    if (!searchUserField) {
      fetchUsers({ skip: (currentPage - 1) * perPage, limit: perPage });
    }
  }, [debouncePerPage, currentPage, searchUserField]);

  const searchUsersCallback = useCallback(() => {
    if (searchUserField) {
      fetchSearchUsers({
        search: searchUserField,
        skip: (currentPage - 1) * perPage,
        limit: perPage,
      });
    }
  }, [searchUserField, debouncePerPage, currentPage]);

  //? Set current page on input change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchUserField, debouncePerPage]);

  //? Search Users
  useEffect(() => {
    if (fetchSearchUsersResponse.data?.users && searchUserField) {
      setUserData(fetchSearchUsersResponse.data?.users);
      setTotal(fetchSearchUsersResponse.data?.total);
      setSelectedSortingHeader(-1);

      if (total < perPage) {
        setPerPage(total);
      } else if (total > perPage && currentPage === 1) {
        setPerPage(10);
      }
    }
  }, [fetchSearchUsersResponse.data?.users, total]);

  //? Users-load
  useEffect(() => {
    if (fetchUsersResponse.data?.users && !searchUserField) {
      setUserData(fetchUsersResponse.data?.users);

      setTotal(fetchUsersResponse.data?.total);

      setSelectedSortingHeader(-1);
    }
  }, [fetchUsersResponse.data?.users, total]);

  //? On page load
  useEffect(() => {
    if (searchUserField) {
      searchUsersCallback();
    }

    if (!searchUserField) {
      loadUsersCallback();
    }
  }, [debouncePerPage, currentPage, searchUserField]);

  //? Error
  useEffect(() => {
    if (fetchUsersResponse.isError) {
      showAlert({ text: "Error on load", type: AlertType.Error, isShow: true });
    }
  }, [fetchUsersResponse.isError]);

  const getPaginationInfoString = useCallback((): string => {
    return `${(currentPage - 1) * perPage} - ${
      currentPage * perPage > total ? total : currentPage * perPage
    } of ${total}`;
  }, [total, perPage, currentPage]);

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
      if (selectedSortingHeader === index && isSortOrderInc) {
        setIsSortOrderInc(false);
        if (userData)
          setUserData(sortedArray(userData, userSortKeys[field], false));
      } else {
        setIsSortOrderInc(true);

        setSelectedSortingHeader(index);
        if (userData) setUserData(sortedArray(userData, userSortKeys[field]));
      }
    }
  };

  return (
    <div className="table">
      <TableHeader title={"Users"} />
      {fetchUsersResponse.isLoading || fetchSearchUsersResponse.isLoading ? (
        <Loader />
      ) : (
        <>
          {!userData.length ? (
            <p style={{ textAlign: "center" }}>Not Found</p>
          ) : (
            <>
              <Table
                //data={userData}

                tableHeaders={Object.keys(userSortKeys)}
                //keyExtractor={({ id }) => id.toString()}
                isSortIncrease={isSortOrderInc}
                indexSelectedTableHeader={selectedSortingHeader}
                sortHandler={sortHandler}
                TableList={<UserList data={userData} />}
              />
              <div className="table__pagination pagination">
                <div className="pagination__limit">
                  Rows per page:
                  <input
                    type="number"
                    value={perPage}
                    max={"20"}
                    min={"1"}
                    disabled={perPage >= total}
                    onChange={(e) => {
                      perPageHandler(e);
                    }}
                  />
                </div>
                <div className="pagination__pages">
                  <div>{getPaginationInfoString()}</div>
                  <div className="pagination__arrows">
                    <ButtonPagination
                      disabled={currentPage < 2}
                      onClick={() => changePageHandler(currentPage - 1)}
                      img={"./assets/img/admin/svg/arrow-left.svg"}
                    />
                    <ButtonPagination
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
        </>
      )}
    </div>
  );
};

export default UserTable;

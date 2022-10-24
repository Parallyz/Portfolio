import { AlertType, userSortKeys } from "../../../../models/utils.model";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useLazyGetUsersQuery,
  useLazySearchUsersQuery,
} from "../../../../redux/user/user.api";

import ButtonPagination from "../../../table/pagination/ButtonPagintation";
import Loader from "../../../loader/Loader";
import Table from "../../../table/Table";
import TableHeader from "../../../table/TableHeader";
import { User } from "../../../../models/user.model";
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
  const [isSortOrderByIncrement, setIsSortOrderByIncrement] =
    useState<boolean>(true);

  const debouncePerPage = useDebounce(perPage, 1000);

  const { searchUserField } = useAppSelector((state) => state.users);

  const { setStateAlert } = useAppActions();

  const [fetchSearchUsers, fetchSearchUsersResponse] =
    useLazySearchUsersQuery();

  const [fetchUsers, fetchUsersResponse] = useLazyGetUsersQuery();

  const loadUsersCallback = useCallback(() => {
    if (searchUserField) {
      return;
    }
    fetchUsers({ skip: (currentPage - 1) * perPage, limit: perPage });
  }, [debouncePerPage, currentPage, searchUserField]);

  const searchUsersCallback = useCallback(() => {
    if (!searchUserField) {
      return;
    }
    fetchSearchUsers({
      search: searchUserField,
      skip: (currentPage - 1) * perPage,
      limit: perPage,
    });
  }, [searchUserField, debouncePerPage, currentPage]);

  //? Set current page on input change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchUserField, debouncePerPage]);

  //? Search Users
  useEffect(() => {
    if (!fetchSearchUsersResponse.data?.users || !searchUserField) return;

    resetSortTableHeader();

    initUserTable(
      fetchSearchUsersResponse.data?.users,
      fetchSearchUsersResponse.data?.total
    );

    if (total < perPage) {
      setPerPage(total);
    } else if (total > perPage && currentPage === 1) {
      setPerPage(10);
    }
  }, [fetchSearchUsersResponse.data?.users, total]);

  //? Users-load
  useEffect(() => {
    if (!fetchUsersResponse.data?.users || searchUserField) return;

    initUserTable(
      fetchUsersResponse.data?.users,
      fetchUsersResponse.data?.total
    );
    resetSortTableHeader();
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
      setStateAlert({
        text: "Error on load",
        type: AlertType.Error,
        isShow: true,
      });
    }
  }, [fetchUsersResponse.isError]);

  const getPaginationString = useCallback((): string => {
    return `${(currentPage - 1) * perPage} - ${
      currentPage * perPage > total ? total : currentPage * perPage
    } of ${total}`;
  }, [total, perPage, currentPage]);

  const initUserTable = (userList: User[], total: number) => {
    setUserData(userList);

    setTotal(total);
  };

  const perPageHandler = (e: React.FormEvent<HTMLInputElement>) => {
    let parsed = parseInt(e?.currentTarget?.value);
    if (isNaN(parsed) || parsed < 0) return;

    let { min, max } = e.currentTarget;

    if (parsed > parseInt(max)) {
      setPerPage(parseInt(max));
    } else if (parsed < parseInt(min)) {
      setPerPage(parseInt(min));
    } else {
      setPerPage(parsed);
    }
    setCurrentPage(1);
  };

  const changePageHandler = (newPage: number): void => {
    scrollToTop();
    setCurrentPage(newPage);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetSortTableHeader = () => {
    setSelectedSortingHeader(-1);
  };
  const sortHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const field: string = e.currentTarget.innerText;
    if (!userSortKeys[field]) return;
    if (selectedSortingHeader === index && isSortOrderByIncrement) {
      setIsSortOrderByIncrement(false);

      if (userData)
        setUserData(sortedArray(userData, userSortKeys[field], false));
    } else {
      setIsSortOrderByIncrement(true);
      setSelectedSortingHeader(index);
      if (userData) setUserData(sortedArray(userData, userSortKeys[field]));
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
                tableHeaders={Object.keys(userSortKeys)}
                //keyExtractor={({ id }) => id.toString()}
                isSortIncrease={isSortOrderByIncrement}
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
                  <div>{getPaginationString()}</div>
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

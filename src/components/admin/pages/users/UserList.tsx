import React, { useCallback, useEffect, useState } from "react";
import Arrow from "../../../../assets/img/admin/svg/arrow-left.svg";
import { useDebounce } from "../../../../hooks/debounce";
import { userSortKeys } from "../../../../models/models";
import { useLazyGetUsersQuery } from "../../../../redux/user/user.api";
import { sortedArrayDec, sortedArrayInc } from "../../../../utils/sortArray";
import Table from "../../tables/Table";
import ContainerHeader from "./ContainerHeader";

const UserList = () => {
  const [perPage, SetPerPage] = useState(10);
  const [currentPage, SetCurrentPage] = useState(1);
  const [total, SetTotal] = useState(0);
  const [userData, SetUserData] = useState([]);
  const [selectedHeader, SetSelectedHeader] = useState(null);
  const [isSortOrderInc, SetIsSortOrderInc] = useState(true);

  const [fetchUsers, { isError, isLoading, data }] = useLazyGetUsersQuery();

  const debounceLimit = useDebounce(perPage, 1000);

  const loadData = useCallback(() => {
    console.log("Callback");

    //const _limit =
    //  (currentPage - 1) * perPage > total
    //    ? total - (currentPage - 1) * perPage
    //    : perPage;

    //const _skip =
    //  (currentPage - 1) * perPage > total
    //    ? total - _limit
    //    : (currentPage - 1) * perPage;

    fetchUsers({ skip: (currentPage - 1) * perPage, limit: perPage });

    //fetchUsers({ skip: _skip, limit: _limit });
  }, [debounceLimit, currentPage]);

  //? On load
  useEffect(() => {
    if (!isLoading && data?.users) {
      SetTotal(data?.total);

      SetUserData(data?.users);
    }
  }, [isLoading, total]);

  //? Users-load
  useEffect(() => {
    if (!isLoading && data?.users) {
      SetUserData(data?.users);
    }
  }, [isLoading, data?.users]);

  //? Limit change load
  useEffect(() => {
    if (debounceLimit) {
      loadData();
    }
  }, [debounceLimit, currentPage]);

  const perPageHandler = (e: React.FormEvent<HTMLInputElement>) => {
    let parsed = parseInt(e?.currentTarget?.value);
    if (!isNaN(parsed) && parsed > 0) {
      let { min, max } = e.currentTarget;
      if (!isNaN(parseInt(max)) && parsed > parseInt(max)) {
        SetPerPage(parseInt(max));
      } else if (!isNaN(parseInt(min)) && parsed < parseInt(min)) {
        SetPerPage(parseInt(min));
      } else {
        SetPerPage(parsed);
      }
      SetCurrentPage(1);
    }
  };

  const chnagePageHandler = (newPage: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    SetCurrentPage(newPage);
  };

  const sortHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const field: string = e.currentTarget.innerText;
    if (userSortKeys[field]) {
      if (selectedHeader === index && isSortOrderInc) {
        SetIsSortOrderInc(false);

        SetUserData(sortedArrayDec(userData, userSortKeys[field]));
      } else {
        SetIsSortOrderInc(true);

        SetSelectedHeader(index);
        SetUserData(sortedArrayInc(userData, userSortKeys[field]));
      }
    }
  };
  return (
    <div className="users">
      <div className="users__container">
        <ContainerHeader nameClass={"users"} title={"Users"} />

        <Table
          isLoading={isLoading}
          data={userData}
          tableHeaders={Object.keys(userSortKeys)}
          keyExtractor={({ id }) => id}
          isSortIncrise={isSortOrderInc}
          indexSelectedTableHeader={selectedHeader}
          sortHandler={sortHandler}
        />
        <div className="users__pagination pagination">
          <div className="pagination__limit">
            Rows per page:
            <input
              type="number"
              value={perPage}
              max={"20"}
              min={"5"}
              onChange={(e) => {
                perPageHandler(e);
              }}
            />
          </div>
          <div className="pagination__pages">
            <div>
              {(currentPage - 1) * perPage} -{" "}
              {currentPage * perPage > data?.total
                ? data?.total
                : currentPage * perPage}{" "}
              of {data?.total}
            </div>
            <div className="pagination__arrows">
              <button
                disabled={currentPage < 2}
                onClick={() => chnagePageHandler(currentPage - 1)}
              >
                <img src={Arrow} alt="arrow" />
              </button>
              <button
                disabled={currentPage * perPage >= data?.total}
                onClick={() => chnagePageHandler(currentPage + 1)}
              >
                <img
                  style={{ transform: "rotate(180deg)" }}
                  src={Arrow}
                  alt="arrow"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;

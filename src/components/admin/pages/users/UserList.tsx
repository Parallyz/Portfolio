import React, { useCallback, useEffect, useState } from "react";
import Sort from "../../../../assets/img/admin/svg/sort.svg";
import Filter from "../../../../assets/img/admin/svg/filter.svg";
import Arrow from "../../../../assets/img/admin/svg/arrow-left.svg";
import { useLazyGetUsersQuery } from "../../../../redux/user/user.api";
import UserItem from "./UserItem";
import Loader from "../../../modal/Loader";
import { useDebounce } from "../../../../hooks/debounce";
import TableHeaderTab from "./TableHeaderTab";
import { User } from "../../../../models/models";

const UserList = () => {
  const [perPage, SetPerPage] = useState(10);
  const [currentPage, SetCurrentPage] = useState(1);
  const [total, SetTotal] = useState(0);
  const debounceLimit = useDebounce(perPage, 1000);
  const [userData, SetuserData] = useState([]);

  const [fetchUsers, { isError, isLoading, data }] = useLazyGetUsersQuery();

  const userSort = {
    Username: "username",
    Name: "firstName",
    Birth: "birthDate",
    Gender: "gender",
  };

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

      SetuserData(data?.users);
    }
  }, [isLoading, total]);

  //? User-load
  useEffect(() => {
    if (!isLoading && data?.users) {
      SetuserData(data?.users);
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

  const sortHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //const field = e.currentTarget.innerText;

    //console.log(userSort[field]);
    //testSort.sort((a, b) => (a?.name > b?.name ? 1 : -1));

    const sorted = [...data.users].sort((a, b) => {
      return a?.username > b?.username ? 1 : -1;
    });

    SetuserData(sorted);
    console.log("User", userData);
  };
  return (
    <div className="users">
      <div className="users__container">
        <div className="users__header">
          <h1>All Users</h1>
          <div className="users__sort">
            <button>
              <img src={Sort} className="img-svg" />
              Sort
            </button>
            <button>
              <img src={Filter} className="img-svg" />
              Filter
            </button>
          </div>
        </div>
        <div className="users__list">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="header">
                <div className="header__block">
                  <button onClick={(e) => sortHandler(e)}>
                    <img src={Sort} className="img-svg" />
                    Username
                  </button>
                </div>
                <div className="header__block">
                  <button onClick={(e) => sortHandler(e)}>
                    <img src={Sort} className="img-svg" />
                    Name
                  </button>
                </div>
                <div className="header__block">
                  <button onClick={(e) => sortHandler(e)}>
                    <img src={Sort} className="img-svg" />
                    Birth
                  </button>
                </div>
                <div className="header__block">
                  <button onClick={(e) => sortHandler(e)}>
                    <img src={Sort} className="img-svg" />
                    Gender
                  </button>
                </div>
              </div>
              {/*{data?.users.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}*/}

              {userData.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </>
          )}
        </div>
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

import React, { useCallback, useEffect, useState } from "react";
import Sort from "../../../../assets/img/admin/svg/sort.svg";
import Filter from "../../../../assets/img/admin/svg/filter.svg";
import { useLazyGetUsersQuery } from "../../../../redux/user/user.api";
import UserItem from "./UserItem";
import Loader from "../../../modal/Loader";
import { useDebounce } from "../../../../hooks/debounce";

const UserList = () => {
  const [perPage, SetPerPage] = useState(10);
  const debounceLimit = useDebounce(perPage, 1000);

  const [fetchUsers, { isError, isLoading, data: userList }] =
    useLazyGetUsersQuery();

  const loadData = useCallback(() => {
    console.log("Callback");

    fetchUsers({ skip: 0, limit: perPage });
  }, [debounceLimit]);

  useEffect(() => {
    if (debounceLimit) {
      loadData();
    }
  }, [debounceLimit]);

  const perPageHandler = (e: React.FormEvent<HTMLInputElement>) => {
    let parsed = parseInt(e?.currentTarget?.value);
    if (!isNaN(parsed)) {
      SetPerPage(parsed);
    }
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
          {!userList ? (
            <Loader />
          ) : (
            <>
              <div className="header">
                <div className="header__block">Username</div>
                <div className="header__block">Name</div>
                <div className="header__block">Birth</div>
                <div className="header__block">Gender</div>
              </div>
              {userList?.users.map((user) => (
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
              onChange={(e) => {
                perPageHandler(e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;

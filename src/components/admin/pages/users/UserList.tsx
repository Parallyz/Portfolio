import React, { useEffect } from "react";
import Sort from "../../../../assets/img/admin/svg/sort.svg";
import Filter from "../../../../assets/img/admin/svg/filter.svg";
import { useLazyGetUsersQuery } from "../../../../redux/user/user.api";
import UserItem from "./UserItem";
import Loader from "../../../modal/Loader";

const UserList = () => {
  const [fetchUsers, { isError, isLoading, data: userList }] =
    useLazyGetUsersQuery();

  useEffect(() => {
    fetchUsers();
  }, []);

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
                <div className="header__block">Date</div>
                <div className="header__block">Gender</div>
              </div>
              {userList?.users.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;

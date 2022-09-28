import React, { useEffect } from "react";
import { User } from "../../../../models/models";
import EditSvg from "../../../../assets/img/admin/svg/edit.svg";
import DeleteSvg from "../../../../assets/img/admin/svg/bucket.svg";
import { useLazyDeleteUserQuery } from "../../../../redux/user/user.api";

interface UserItemProps {
  user: User;
}

const UserItem = ({ user }: UserItemProps) => {
  const [deleteUser, { isError, isLoading, data: response }] =
    useLazyDeleteUserQuery();

  useEffect(() => {
    if (response) console.log("is Deleted", response.isDeleted);
  }, [response]);

  const deleteHandler = (id: number): void => {
    deleteUser(id);
  };

  const getDate = () => {
    const data = user.birthDate.split("-");
    return `${data[2]}.${data[1]}.${data[0]}`;
  };

  return (
    <div className="user">
      <div className="user__item">
        <div className="user__container">
          <div className="user__img">
            <img src={user.image} loading="lazy" />
          </div>
          <div className="user__info ">
            <div className="info__bold">{user.username}</div>
            <div className="info__light">{user.email}</div>
          </div>
          <div className="user__info">
            <div className="info__bold">
              {user.firstName} {user.lastName}
            </div>
            <div className="info__light">{user.phone}</div>
          </div>
          <div className="user__info">
            <div className="info__bold">{getDate()}</div>
          </div>
          <div className="user__info">
            <div
              className={
                user.gender === "male"
                  ? "info__category info__category--yellow"
                  : "info__category info__category--green"
              }
            >
              {user.gender.toUpperCase()}
            </div>
          </div>
          <div className="user__btn">
            <button>
              <img
                className="img__svg img__svg--yellow"
                src={EditSvg}
                alt="Edit"
              />
            </button>
          </div>
          <div className="user__btn">
            <button onClick={() => deleteHandler(user.id)}>
              <img
                className="img__svg img__svg--red"
                src={DeleteSvg}
                alt="Edit"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;

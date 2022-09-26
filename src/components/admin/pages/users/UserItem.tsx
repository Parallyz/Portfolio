import React from "react";
import { User } from "../../../../models/models";

interface UserItemProps {
  user: User;
}

const UserItem = ({ user }: UserItemProps) => {
  const category = [
    "info__category",
    user.gender === "male" ? "info__category--yellow" : "info__category--green",
  ];

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
            <div className={category.join(" ")}>
              {user.gender.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;

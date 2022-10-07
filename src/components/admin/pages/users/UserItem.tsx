import React, { useEffect } from "react";
import { AlertType, User } from "../../../../models/models";
import { useLazyDeleteUserQuery } from "../../../../redux/user/user.api";
import { useAppActions } from "../../../../hooks/actions";

interface UserItemProps {
  item: User;
}

const UserItem = ({ item }: UserItemProps) => {
  const [deleteUser, { isError, isLoading, data: response }] =
    useLazyDeleteUserQuery();

  const { setStateAlert: showAlert } = useAppActions();

  useEffect(() => {
    if (response) {
      showAlert({
        text: "Deleted succesfull",
        type: AlertType.Success,
        isShow: true,
      });
    } else if (isError) {
      showAlert({
        text: "Error on delete ",
        type: AlertType.Error,
        isShow: true,
      });
    }
  }, [isLoading]);

  const deleteHandler = (id: number): void => {
    deleteUser(id);
  };

  const getDate = () => {
    const data = item.birthDate.split("-");
    return `${data[2]}.${data[1]}.${data[0]}`;
  };

  return (
    <td className="item">
      <div className="item__img">
        <img src={item.image} loading="lazy" />
      </div>
      <div className="item__info ">
        <div className="info__bold">{item.username}</div>
        <div className="info__light">{item.email}</div>
      </div>
      <div className="item__info">
        <div className="info__bold">
          {item.firstName} {item.lastName}
        </div>
        <div className="info__light">{item.phone}</div>
      </div>
      <div className="item__info">
        <div className="info__bold">{getDate()}</div>
      </div>
      <div className="item__info">
        <div
          className={
            item.gender === "male"
              ? "info__category info__category--yellow"
              : "info__category info__category--green"
          }
        >
          {item.gender.toUpperCase()}
        </div>
      </div>
      <div className="item__btn">
        <button>
          <img
            className="img--svg img--svg--yellow"
            src="./assets/img/admin/svg/edit.svg"
            alt="Edit"
          />
        </button>
      </div>
      <div className="item__btn">
        <button onClick={() => deleteHandler(item.id)}>
          <img
            className="img--svg img--svg--red"
            src="./assets/img/admin/svg/bucket.svg"
            alt="Edit"
          />
        </button>
      </div>
    </td>
  );
};

export default UserItem;

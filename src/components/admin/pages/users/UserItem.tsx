import React, { useEffect } from "react";
import { AlertType, User } from "../../../../models/models";
import EditSvg from "../../../../assets/img/admin/svg/edit.svg";
import DeleteSvg from "../../../../assets/img/admin/svg/bucket.svg";
import { useLazyDeleteUserQuery } from "../../../../redux/user/user.api";
import { useAppSelector } from "../../../../hooks/redux";
import { useAppActions } from "../../../../hooks/actions";

interface UserItemProps {
  item: User;
}

const UserItem = ({ item }: UserItemProps) => {
  const [deleteUser, { isError, isLoading, data: response }] =
    useLazyDeleteUserQuery();

  const { showAlert, setAlertType } = useAppActions();

  useEffect(() => {
    if (response) {
      setAlertType(AlertType.Success);
      showAlert("Deleted succesfull");
    } else if (isError) {
      setAlertType(AlertType.Error);
      showAlert("Error on delete ");
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

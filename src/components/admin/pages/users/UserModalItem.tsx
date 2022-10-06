import React, { FormEvent, useEffect, useState } from "react";
import { useAppActions } from "../../../../hooks/actions";
import { useAppSelector } from "../../../../hooks/redux";
import { AlertType, User } from "../../../../models/models";
import { useAddUserMutation } from "../../../../redux/user/user.api";
import Modal from "../../../modal/Modal";

const UserModalItem = () => {
  const [createUser, { isError, isLoading, data }] = useAddUserMutation();
  const { setStateUserModal, setStateAlert: showAlert } = useAppActions();
  const { isUserModal } = useAppSelector((state) => state.users);

  const addUserHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: User = {
      username: "New user",
    };

    createUser(user);
    setStateUserModal(false);
  };

  useEffect(() => {
    if (isError) {
      showAlert({ text: "Error on Add", type: AlertType.Error, isShow: true });
    }
  }, [isError]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      console.log("Add response", data);
      showAlert({
        text: "Added successfuly",
        type: AlertType.Success,
        isShow: true,
      });
    }
  }, [isLoading]);

  return (
    <Modal isOpen={isUserModal} onClose={() => setStateUserModal(false)}>
      <div className="user__modal">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => addUserHandler(e)}>
          <input type="submit" value="Add" />
        </form>
      </div>
    </Modal>
  );
};

export default UserModalItem;

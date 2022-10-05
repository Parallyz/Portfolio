import React, { useEffect } from "react";
import { useAppActions } from "../../../../hooks/actions";
import { AlertType, User } from "../../../../models/models";
import { useAddUserMutation } from "../../../../redux/user/user.api";

const UserModalItem = () => {
  const [createUser, { isError, isLoading, data }] = useAddUserMutation();
  const { setStateModal, setAlertType, showAlert } = useAppActions();

  const addUserHandler = () => {
    const user: User = {
      username: "New user",
    };

    createUser(user);
    setStateModal(false);
  };

  useEffect(() => {
    if (isError) {
      setAlertType(AlertType.Error);
      showAlert("Error on Add");
    }
  }, [isError]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      console.log("Add result", data);
      setAlertType(AlertType.Success);
      showAlert("Added successfuly");
    }
  }, [isLoading]);

  return (
    <div className="user__modal">
      <button onClick={() => addUserHandler()}>Add</button>
    </div>
  );
};

export default UserModalItem;

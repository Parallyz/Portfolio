import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useAddUserMutation,
  useLazyGetUserQuery,
  useUpdateUserMutation,
} from "../../../../redux/user/user.api";

import { AlertType } from "../../../../models/utils.model";
import Modal from "../../../modal/Modal";
import Select from "react-select";
import { User } from "../../../../models/user.model";
import { useAppActions } from "../../../../hooks/actions";
import { useAppSelector } from "../../../../hooks/redux";

interface IOption {
  value: string;
  label: string;
}

const options: IOption[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const UserModalItem = () => {
  const [createUser, createUserResponse] = useAddUserMutation();
  const { setStateUserModal, setStateAlert, setEditUserId } = useAppActions();
  const { isUserModal, editUserId } = useAppSelector((state) => state.users);

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const selectedFileBlock = useRef<HTMLDivElement>();
  const [preview, setPreview] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<IOption>(null);

  const [fetchUser, fetchUserResponse] = useLazyGetUserQuery();
  const [updateUser, updateUserResponse] = useUpdateUserMutation();

  const addUserHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: User = {
      firstName: name,
      lastName,
      image: preview,
      gender: selectedGender?.value || "male",
    };

    if (!editUserId) createUser(user);
    else {
      user.id = editUserId;
      updateUser(user);
    }
    resetStates();
    setStateUserModal(false);
  };

  const closeModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStateUserModal(false);
  };

  const editCallback = useCallback(() => {
    if (editUserId) fetchUser(editUserId);
  }, [editUserId]);

  //? Update handler
  useEffect(() => {
    if (editUserId) {
      editCallback();
    }
  }, [editUserId]);

  //? Init get user
  useEffect(() => {
    if (fetchUserResponse.data) {
      setName(fetchUserResponse?.data?.username);
      setLastName(fetchUserResponse?.data?.lastName);

      setSelectedGender(
        options.find((el) => el.value === fetchUserResponse?.data?.gender)
      );
    }
  }, [fetchUserResponse.data]);

  //? Preview img on select change
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    selectedFileBlock.current.classList.add("file--downloaded");

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const resetStates = () => {
    setName("");
    setLastName("");
    setSelectedFile(null);
    setPreview("");
    setSelectedGender(null);
    selectedFileBlock.current.classList.remove("file--downloaded");
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);

    //var reader = new FileReader();
    //reader.onload = function () {
    //  setSelectedFile(this.result);
    //};
    //reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (updateUserResponse?.data) {
      setEditUserId(null);
    }
  }, [updateUserResponse.data]);

  //?  Add onError
  useEffect(() => {
    if (createUserResponse.isError || updateUserResponse.isError) {
      setStateAlert({
        text: "Error",
        type: AlertType.Error,
        isShow: true,
      });
    }
  }, [
    createUserResponse.isError,
    updateUserResponse.isError,
    fetchUserResponse.isError,
  ]);

  //? Add on Success
  useEffect(() => {
    if (createUserResponse.data || updateUserResponse.data) {
      const text = editUserId ? "Updated successfully" : "Added successfully";
      setStateAlert({
        text,
        type: AlertType.Success,
        isShow: true,
      });
    }
  }, [createUserResponse.isLoading, updateUserResponse.isLoading]);

  return (
    <Modal isOpen={isUserModal} onClose={() => setStateUserModal(false)}>
      <div className="user__modal">
        <h2>Add User</h2>
        <form
          className="form user__form"
          onSubmit={(e: FormEvent<HTMLFormElement>) => addUserHandler(e)}
        >
          <div className="form__group  ">
            <label>
              First name:
              <input
                className="input input--default input--text"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="form__group ">
            <label>
              Last name:
              <input
                className="input input--default  input--text"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
          <div className="form__group form__group-select  input input--select">
            <label>Select option :</label>

            <Select
              classNamePrefix="input--select"
              isSearchable={true}
              value={selectedGender}
              onChange={setSelectedGender}
              options={options}
            />
          </div>
          <div ref={selectedFileBlock} className="form__group file-area ">
            <label>
              Images Your images should be at least 400x300 wide
              <input
                className="input input--file"
                type="file"
                multiple={false}
                required
                accept=".png, .jpg, .jpeg"
                onChange={(e) => onSelectFile(e)}
              />
            </label>
            {/*{selectedFile && <img src={preview} />}*/}
          </div>

          <div className="form__footer">
            <button className="btn btn--green" type="submit">
              Add
            </button>
            <button
              className="btn btn--red"
              onClick={(e) => closeModalHandler(e)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default React.memo(UserModalItem);

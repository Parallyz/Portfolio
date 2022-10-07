import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppActions } from "../../../../hooks/actions";
import { useAppSelector } from "../../../../hooks/redux";
import { AlertType, User } from "../../../../models/models";
import { useAddUserMutation } from "../../../../redux/user/user.api";
import Modal from "../../../modal/Modal";

const UserModalItem = () => {
  const [createUser, { isError, isLoading, data }] = useAddUserMutation();
  const { setStateUserModal, setStateAlert } = useAppActions();
  const { isUserModal } = useAppSelector((state) => state.users);

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [preview, setPreview] = useState<string>("");

  const addUserHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: User = {
      firstName: name,
      lastName,
      image: preview,
    };

    console.log(preview);

    createUser(user);
    setStateUserModal(false);
  };

  const closeModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStateUserModal(false);
  };

  //? Preview img on select change
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);

    if (selectedFile)
      document.querySelector(".file-area label").classList.add("label--active");
    else {
      document
        .querySelector(".file-area label")
        .classList.remove("label--active");
    }
    //console.log(selectedFile);

    //var reader = new FileReader();
    //reader.onload = function () {
    //  setSelectedFile(this.result);
    //};
    //reader.readAsDataURL(e.target.files[0]);
  };
  //?  Add onError
  useEffect(() => {
    if (isError) {
      setStateAlert({
        text: "Error on Add",
        type: AlertType.Error,
        isShow: true,
      });
    }
  }, [isError]);

  //? Add on Error
  useEffect(() => {
    if (!isLoading && !isError && data) {
      console.log("Add response", data);
      setStateAlert({
        text: "Added successfuly",
        type: AlertType.Success,
        isShow: true,
      });
    }
  }, [isLoading]);

  return (
    <Modal isOpen={isUserModal} onClose={() => setStateUserModal(false)}>
      <div className="user__modal">
        <h2>Add User</h2>
        <form
          className="form user__form"
          onSubmit={(e: FormEvent<HTMLFormElement>) => addUserHandler(e)}
        >
          <div className="form-group  input">
            <label>
              First name:
              <input
                className="input input__text"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group input">
            <label>
              Last name:
              <input
                className=" input__text"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group file-area input">
            <label>
              <span> Images Your images should be at least 400x300 wide</span>
              <input
                className=" input__file"
                type="file"
                multiple={false}
                required
                accept=".png, .jpg, .jpeg"
                onChange={(e) => onSelectFile(e)}
              />
            </label>
            {selectedFile && <img src={preview} />}
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

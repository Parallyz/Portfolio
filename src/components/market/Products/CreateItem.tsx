import React, { useState } from "react";
import Modal from "../../modal/Modal";

function ModalTest() {
  const [value, setValue] = useState<string>("");
  const [modal, setModal] = useState<boolean>(true);

  //const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //  setValue(event.target.value);
  //};

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              className=""
              placeholder="Enter product title..."
              // value={value}
              //  onChange={changeHandler}
            />

            <button type="submit"> Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default ModalTest;

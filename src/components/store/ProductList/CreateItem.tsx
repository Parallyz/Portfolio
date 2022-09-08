import React, { useState } from "react";
import Modal from "../../modal/Modal";

function ModalTest() {
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(true);

  //const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //  setValue(event.target.value);
  //};

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      {modal && (
        <Modal title="Title" onClose={() => setModal(false)}>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              className="border py-2 px-4 mb-2 w-full outline-0"
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

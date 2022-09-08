import React from "react";
import Loader from "../modal/Loader";
import Modal from "../modal/Modal";
import ModalTest from "../store/CreateItem";

const Header = () => {
  return (
    <>
      <header>
        Header
        <nav></nav>
      </header>

      {/*<Modal title="Some title">
        <div>qwe</div>
      </Modal>*/}
      {/*<ModalTest />*/}
      <Loader/>
    </>
  );
};

export default Header;

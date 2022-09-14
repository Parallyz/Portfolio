import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import Loader from "../modal/Loader";


const Header = () => {

  //useEffect(() => {
  //  dispatch(showLoader());
  //  setTimeout(() => {
  //    dispatch(hideLoader());
  //  }, 5000);
  //}, []);

  return (
    <>
      <header>
        <nav></nav>
      </header>
 
    </>
  );
};

export default Header;

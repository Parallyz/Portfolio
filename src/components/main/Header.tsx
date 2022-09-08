import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { showLoader, hideLoader } from "../../redux/reducers/appReducer";
import Loader from "../modal/Loader";


const Header = () => {
  const dispatch = useAppDispatch();
  const isLoader = useAppSelector((state) => state.app.isLoader);

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

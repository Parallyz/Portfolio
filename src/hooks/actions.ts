import { appActions } from "../redux/app/app.slice";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { usersActions } from "../redux/user/userSlice";

const actions = {
  ...appActions,
  ...usersActions,
};

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

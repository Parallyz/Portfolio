import { appActions } from '../redux/app/app.slice';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";



const actions = {
  ...appActions,

};

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

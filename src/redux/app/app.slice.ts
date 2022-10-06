import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "../../models/models";

type AlertObjType = {
  text: string;
  type: AlertType;
  isShow: boolean;
};
type AppSliceState = {
  isModal: boolean;
  alert: AlertObjType;
};

const initialState: AppSliceState = {
  isModal: false,

  alert: { text: "", type: AlertType.Error, isShow: false },
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStateModal(state, action: PayloadAction<boolean>) {
      state.isModal = action.payload;
    },
    setStateAlert(state, message: PayloadAction<AlertObjType>) {
      state.alert.isShow = message.payload.isShow;
      state.alert.text = message.payload.text || "Some error";
      state.alert.type = message.payload.type || AlertType.Error;
    },
  },
});

export const appActions = AppSlice.actions;
export const appReducer = AppSlice.reducer;

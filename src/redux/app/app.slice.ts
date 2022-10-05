import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "../../models/models";

type AppSliceState = {
  isModal: boolean;
  isError: boolean;

  alert: string;
  alertType: AlertType;
};

const initialState: AppSliceState = {
  isModal: false,
  isError: false,
  alert: "",
  alertType: AlertType.Error,
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showModal(state) {
      state.isModal = true;
    },
    hideModal(state) {
      state.isModal = false;
    },
    showAlert(state, message: PayloadAction<string>) {
      state.isError = true;
      state.alert = message.payload || "Some error";
    },
    hideAlert(state) {
      state.isError = false;
    },

    setAlertType(state, action: PayloadAction<AlertType>) {
      state.alertType = action.payload || AlertType.Error;
    },
  },
});

export const appActions = AppSlice.actions;
export const appReducer = AppSlice.reducer;

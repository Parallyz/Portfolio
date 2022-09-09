import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppSliceState = {
 
  isModal: boolean;
  counter: number;
  error: string;
};

const initialState: AppSliceState = {
 
  isModal: false,
  counter: 0,
  error: "",
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
   
    addCount(state, action: PayloadAction<number>) {
      state.counter += action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload || "Default error";
    },
  },
});

export const { showModal, hideModal} =
  AppSlice.actions;
export default AppSlice.reducer;

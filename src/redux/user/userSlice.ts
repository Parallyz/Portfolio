import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserSliceState {
  searchUserField: string;
  isUserModal: boolean;
}

const initialState: UserSliceState = {
  searchUserField: "",
  isUserModal: false,
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchField(state, action: PayloadAction<string>) {
      state.searchUserField = action.payload;
    },
    setStateUserModal(state, action: PayloadAction<boolean>) {
      state.isUserModal = action.payload;
    },
  },
});

export const usersActions = UsersSlice.actions;
export const usersReducer = UsersSlice.reducer;

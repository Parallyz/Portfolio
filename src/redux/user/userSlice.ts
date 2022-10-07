import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/models";

interface UserSliceState {
  users: Array<User>;
  searchUserField: string;
  isUserModal: boolean;
}

const initialState: UserSliceState = {
  users: [],
  searchUserField: "",
  isUserModal: false,
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    initData(state, action: PayloadAction<Array<User>>) {
      state.users = action.payload;
    },
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

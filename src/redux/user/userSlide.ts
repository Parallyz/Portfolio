import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/models";

interface UserSliceState {
  users: Array<User>;
}

const initialState: UserSliceState = {
  users: [],
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    initData(state, action: PayloadAction<Array<User>>) {
      state.users = action.payload;
    },
  },
});

export const usersActions = UsersSlice.actions;
export const usersReducer = UsersSlice.reducer;

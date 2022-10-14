import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserSliceState {
  searchUserField: string;
  isUserModal: boolean;
  editUserId: number | null;
}

const initialState: UserSliceState = {
  searchUserField: "",
  isUserModal: false,
  editUserId: null,
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
    setEditUserId(state, action: PayloadAction<number | null>) {
      state.editUserId = action.payload;
    },
  },
});

export const usersActions = UsersSlice.actions;
export const usersReducer = UsersSlice.reducer;

import { IProductItem } from "./../../models/models";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { storeApi } from "../../components/store/API/storeApi";
import { store } from "../store";

//const fetchUserById = createAsyncThunk(
//  "users/fetchByIdStatus",
//  async (userId: number, thunkAPI) => {
//    const response = await userAPI.fetchById(userId);
//    return response.data;
//  }
//);
export const fetchProducts = createAsyncThunk("products/fetchAllProducts", async () => {
  const response = await storeApi.fetchAllProducts();
  return response.data;
});

type StoreSliceState = {
  productList: IProductItem[];
};

const initialState: StoreSliceState = {
  productList: [],
};

const StoreSlice = createSlice({
  name: "store",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productList = [...state.productList, ...action.payload];
    });
  },
});


export const {  } = StoreSlice.actions;
export default StoreSlice.reducer;

import { IProductItem } from "./../../models/models";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { storeUrl } from "../../models/path";


export const fetchProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {   
      return (await axios.get<IProductItem[]>(storeUrl.products)).data;
    } catch (e: unknown) {
      const error = e as AxiosError;
      return error.message;
    }
  }
);

type StoreSliceState = {
  productList: IProductItem[];
  loading: boolean;
  error: string;
};

const initialState: StoreSliceState = {
  productList: [],
  loading: false,
  error: "",
};

const StoreSlice = createSlice({
  name: "store",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log('Ful');
      
      state.loading = false;
      state.productList = action.payload as IProductItem[];
      state.error = "";
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.productList = [];
      state.error = action.error.message;
    });
  },
});

export const {} = StoreSlice.actions;
export default StoreSlice.reducer;

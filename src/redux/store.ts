import { configureStore } from "@reduxjs/toolkit";
import { marketApi } from "./market/market.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appReducer } from "./app/app.slice";

export const store = configureStore({
  reducer: {
    [marketApi.reducerPath]: marketApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marketApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

import { userApi } from "./user/user.api";
import { configureStore } from "@reduxjs/toolkit";
import { marketApi } from "./market/market.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appReducer } from "./app/app.slice";
import { usersReducer } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    [marketApi.reducerPath]: marketApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    app: appReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marketApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

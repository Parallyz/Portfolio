import { appReducer } from "./app/app.slice";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./user/user.api";
import { usersReducer } from "./user/userSlice";

//? Auto logs in console
//const logger = createLogger({
//  // ...options
//});

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    app: appReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware
      //logger
    ),
});

//? For refetch on focus for RTKQuery
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

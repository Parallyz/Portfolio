import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import storeReducer from "./reducers/storeReducer";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";



const rootReducer = combineReducers({
  app: appReducer,
  store: storeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/AuthSlice'
import categorySlice from '../features/CategorySlice'
import accessoriesSlice from '../features/AccessoriesSlice'
import CartSlice from "../features/CartSlice";

const reducer = {
  authReducer,
  categorySlice,
  accessoriesSlice,
  CartSlice
};

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
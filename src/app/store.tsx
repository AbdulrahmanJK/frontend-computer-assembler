import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/AuthSlice'
import categorySlice from '../features/CategorySlice'
import accessoriesSlice from '../features/AccessoriesSlice'

const reducer = {
  authReducer,
  categorySlice,
  accessoriesSlice
};

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
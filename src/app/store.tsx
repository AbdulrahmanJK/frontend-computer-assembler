import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/AuthSlice'
import categorySlice from '../features/CategorySlice'

const reducer = {
  authReducer,
  categorySlice
};

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
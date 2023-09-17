import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/AuthSlice'

const reducer = {
  authReducer
};

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
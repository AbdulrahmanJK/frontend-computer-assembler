import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/AuthSlice';
import postReducer from '../store/PostSlice';
import commentReducer from '../store/CommentSlice';

const reducer = {
  authReducer,
  postReducer, // Используется имя среза, как оно экспортируется
  commentReducer,
};

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
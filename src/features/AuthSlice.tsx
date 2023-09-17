import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Импортируйте библиотеку axios

export interface User {
  id: string
  username: string;
  password: string;
  roles: string;
}

export interface AuthState {
  users: User[];
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface forArgs {
  email: string;
  password: string;
}

const initialState: AuthState = {
  users: [],
  token: null,
  status: "idle",
  error: null,
};

// Создайте асинхронные Thunk-функции для регистрации и входа
export const registr = createAsyncThunk(
  "reg/user",
  async ({ email, password }: forArgs,) => {
    try {
      const response = await axios.post("http://localhost:9000/auth", {
        email,
        password,
      });

      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Обработка ошибки или повторное выбрасывание ее для обработки Redux Toolkit
        throw error;
      } else {
        // Обработка неожиданной ошибки
        throw new Error("Unexpected error");
      }
    }
  }
);

export const signIn = createAsyncThunk(
  "log/user",
  async ({ email, password }: forArgs,) => {
    try {
      const response = await axios.post("http://localhost:9000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Обработка ошибки или повторное выбрасывание ее для обработки Redux Toolkit
        throw error;
      } else {
        // Обработка неожиданной ошибки
        throw new Error("Unexpected error");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registr.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export default authSlice.reducer;

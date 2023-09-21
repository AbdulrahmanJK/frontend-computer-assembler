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
  username: string,
}

const initialState: AuthState = {
  users: [],
  token: localStorage.getItem("token"),
  status: "idle",
  error: null,
};

// Создайте асинхронные Thunk-функции для регистрации и входа
export const registr = createAsyncThunk(
  "reg/user",
  async ({ email, password }: forArgs,) => {
    try {
      const response = await axios.post("http://localhost:4000/auth", {
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
      const response = await axios.post("http://localhost:4000/login", {
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

export const fetchUsers = createAsyncThunk(
  "fetch/users",
  async (_)=>{
    try {
      const res = await axios.get("http://localhost:4000/getMe")
      const data = res.data
      return data
    } catch (error) {
      error
    }
  }
)

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

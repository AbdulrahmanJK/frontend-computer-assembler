import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  _id: any;
  id: string;
  username: string;
  password: string;
  role: string;
}

export interface CurrentUser {
  role: string;
  _id: string;
  username: string;
  email: string;
  avatarURL: string;
  // Другие поля, которые вы хотите хранить о пользователе
}

export interface AuthState {
  users: User[];
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentUser: CurrentUser | null;
}

interface forArgs {
  email: string;
  password: string;
  username: string;
}

const initialState: AuthState = {
  users: [],
  token: localStorage.getItem("token"),
  status: "idle",
  error: null,
  currentUser: null, // Начальное значение для текущего пользователя
};

// Создайте асинхронные Thunk-функции для регистрации и входа
export const registr = createAsyncThunk(
  "reg/user",
  async ({ email, password }: forArgs) => {
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

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async ({ id, username, avatarURL, token }: { id: string; username?: string; avatarURL?: string; token: string }) => {
    try {
      const response = await axios.patch(`http://localhost:4000/patchUser/${id}`, {
        username,
        avatarURL,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);





export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (token: string) => {
    try {
      const response = await axios.get("http://localhost:4000/getMe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      return response.data;
    } catch (error) {
      error;
    }
  }
);


export const signIn = createAsyncThunk(
  "log/user",
  async ({ email, password }: forArgs) => {
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

export const authSlice = createSlice({
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
      })
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.currentUser = action.payload.user; // Проверьте, какой путь к username на сервере
        state.status = "succeeded";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        // Обновите состояние с обновленными данными пользователя
        state.currentUser = action.payload.user;
      });
  },
});

export default authSlice.reducer;

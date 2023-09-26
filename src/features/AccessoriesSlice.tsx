import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Accessories {
    image: string;
    title: string;
    price: number;
    attributes: string;
    category: string;
}
export interface AccessoriesState {
    accessories: Accessories[];
    error: string | null;
}

export interface CreateAccessories {
    image: string;
    title: string;
    price: number;
    attributes: string;
    category: string;
}
const initialState: AccessoriesState = {
    accessories: [],
    error: null,
}

export const fetchAccessories = createAsyncThunk(
    "accessories/fetch",
    async (_) => {
        try {
            const res = await axios.get("http://localhost:4000/accessories")
            const data = res.data
            return data
        } catch (error) {
            throw error; // Обработка ошибки
        }
    }
)

export const fetchAccessoriesCategory = createAsyncThunk(
    "accessories/category",
    async (id) => {
        try {
            const res = await axios.get(`http://localhost:4000/accessories/${id}`)
            const accessories = res.data
            return accessories
        } catch (error) {
            throw error; // Обработка ошибки
        }
    }
)

export const fetchOneAccessories = createAsyncThunk("accessories/fetchOne",
    async (id) => {
        try {
            const res = await axios.get(`http://localhost:4000/accessories/one/${id}`)
            const accessories = res.data
            return accessories
        } catch (error) {
            throw error; // Обработка ошибки
        }
    }
)

export const createAccessories = createAsyncThunk(
    "accessories/createAccessories",
    async (accessory: CreateAccessories) => {
        try {
            const response = await axios.post(
                "http://localhost:4000/accessories",
                accessory
            );

            if (response.status !== 200) {
                throw new Error("Server error");
            }

            const data = response.data;
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Unexpected error");
            }
        }
    }
);

const accessoriesSlice = createSlice({
    name: "accessories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccessories.fulfilled, (state, action) => {
                state.accessories = action.payload
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(fetchAccessoriesCategory.fulfilled, (state, action) => {
                state.accessories = action.payload
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(fetchOneAccessories.fulfilled, (state, action) => {
                state.accessories = action.payload
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(createAccessories.fulfilled, (state, action) => {
                state.accessories.unshift(action.payload);
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(fetchAccessories.rejected, (state, action) => {
                state.error = "Ошибка при загрузке аксессуаров"; // Установка текста ошибки
            })
            .addCase(fetchAccessoriesCategory.rejected, (state, action) => {
                state.error = "Ошибка при загрузке аксессуаров по категории"; // Установка текста ошибки
            })
            .addCase(fetchOneAccessories.rejected, (state, action) => {
                state.error = "Ошибка при загрузке одного аксессуара"; // Установка текста ошибки
            })
            .addCase(createAccessories.rejected, (state, action) => {
                state.error = "Ошибка при создании аксессуара"; // Установка текста ошибки
            });
    },
});

export default accessoriesSlice.reducer;

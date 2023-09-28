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
   accessories:[],
   error: string | null,
   oneAccessori: []

}

export interface CreateAccessories {
    image: string;
    title: string;
    price: number;
    attributes: string;
    category: string;
}
const initialState : AccessoriesState ={
    accessories:[],
    oneAccessori: [],
    error: null,
    loading: false
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
export const deleteOneAccessories = createAsyncThunk("delete/one",
async (id)=>{
    try {
        const res = await axios.get(`http://localhost:4000/accessories/one/${id}`)
        const accessories = res.data
        return accessories
    } catch (error) {
        error
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
        .addCase(fetchAccessories.fulfilled,(state,action)=>{
            state.accessories = action.payload
        })
        .addCase(fetchAccessoriesCategory.fulfilled,(state,action)=>{
            state.accessories = action.payload
        })
        .addCase(fetchOneAccessories.fulfilled,(state, action)=>{
            
            state.oneAccessori.unshift(action.payload)
            
        })
        .addCase(deleteOneAccessories.fulfilled,(state, action)=>{
            
            state.oneAccessori = state.oneAccessori.filter((item) => item._id !== action.payload._id)
        })
    },
});

export default accessoriesSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
    category:[],
}

export const fetchCategory = createAsyncThunk(
    "category/fetch",
    async ()=>{
        try {
            const res = await axios.get("http://localhost:4000/category")

            const data = await res.data
            return data
        } catch (error) {
             error
        }
    }
)
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchCategory.fulfilled,(state,action)=>{
            state.category = action.payload
        })
    }
})
export default categorySlice.reducer
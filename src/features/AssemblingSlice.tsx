import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Assembling {
    title: string,
    cpu: string,
    gpu: string,
    ram:number,
    powerblock: string,
    drive: string,
    body: string,
    fan:string,
    motherboard:string,
    

}
export interface AssemblingState {
   assembling:[],
   error: string | null,
}

export interface CreateAssembling {
    cpu: string,
    gpu: string,
    ram:number,
    powerblock: string,
    drive: string,
    body: string,
    fan:string,
    motherboard:string,
}
const initialState : AssemblingState ={
    assembling:[],
    error:null
}


export const fetchAssembling = createAsyncThunk(
    "assembling/fetch",
    async(_)=>{
        try {
           const res = await axios.get("http://localhost:4000/assembling") 
           const data = res.data
           return data
        } catch (error) {
            error
        }
    }
)



export const fetchOneAssembling = createAsyncThunk("fetch/one",
async (id)=>{
    try {
        const res = await axios.get(`http://localhost:4000/assembling/${id}`)
        const assembling = res.data
        return assembling
    } catch (error) {
        error
    }
}
)
export const deleteOneAssembling = createAsyncThunk("delete/one",
async (id)=>{
    try {
        const res = await axios.get(`http://localhost:4000/assembling/${id}`)
        const assembling = res.data
        return assembling
    } catch (error) {
        error
    }
}
)

const assemblingSlice = createSlice({
    name:"assembling",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAssembling.fulfilled,(state,action)=>{
            state.assembling = action.payload
        })
        // .addCase(fetchAccessoriesCategory.fulfilled,(state,action)=>{
        //     state.accessories = action.payload
        // })
        // .addCase(fetchOneAccessories.fulfilled,(state, action)=>{
        //     // console.log(action.payload);
            
        //     state.oneAccessori.push(action.payload)
        // })
        // .addCase(deleteOneAccessories.fulfilled,(state, action)=>{
        //     // console.log(action.payload);
        //     // console.log(state.oneAccessori);
            
        //     state.oneAccessori = state.oneAccessori.filter((item) => item._id !== action.payload._id)
        // })
    },
});
export default assemblingSlice.reducer
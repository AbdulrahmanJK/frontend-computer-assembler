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
    title: string,
    price:number

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
export const deleteOneAssembling = createAsyncThunk("delete/Assemblone",
async (id)=>{
    try {
        const res = await axios.delete(`http://localhost:4000/assembling/${id}`)
        const assembling = res.data
        return assembling
    } catch (error) {
        error
    }
}
)
export const createAssembling = createAsyncThunk("add/assembl",
async ({cpu,gpu,powerblock,ram,fan,motherboard,body,title,drive,price}:CreateAssembling)=>{
    try {
        const res = await axios.post(
            "http://localhost:4000/assembling",
            {cpu,gpu,powerblock,ram,fan,motherboard,body,title,drive,price}
        )
        const data = await res.data
        return data
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
       .addCase(createAssembling.fulfilled,(state,action)=>{
        state.assembling.push(action.payload)
       })
        .addCase(fetchOneAssembling.fulfilled,(state, action)=>{
            
            state.assembling = action.payload
        })
        .addCase(deleteOneAssembling.fulfilled,(state,action)=>{
            state.assembling = state.assembling.filter((item) => item._id !== action.payload._id)
        })
    },
});
export default assemblingSlice.reducer
// cartSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CartItem {
 CartItem:[]
}
 export interface createCartProd{
  accessories: string,
  assembling: string
}

export const initialState ={
  CartItem:[],
  status: '',
};


export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async(_)=>{
    try {
      const res = await axios.get("http://localhost:4000/cart")
      const data = res.data
      return data
    } catch (error) {
      error
    }
  }
)

export const createCart = createAsyncThunk("add/cartProd",
async({accessories, assembling}, thunkAPI)=>{
  try {
    const res = await axios.post("http://localhost:4000/cart",
    {accessories,assembling})

    return thunkAPI.dispatch(fetchCart());
    
  } catch (error) {
    error
  }
}
)
export const removeCartItem = createAsyncThunk("delete/cartProd",
async(id)=>{
  try {
    const res = await axios.delete(`http://localhost:4000/cart/${id}`)
    
    const data = await res.data

    
    return data
    
  } catch (error) {
    error
  }
}
)
export const removeAllCartItem = createAsyncThunk("deleteAll/cartProd",
async()=>{
  try {
    const res = await axios.delete(`http://localhost:4000/cart`)
    
    const data = res.data

    
    return data
    
  } catch (error) {
    error
  }
}
)


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(fetchCart.fulfilled,(state,action)=>{
      state.CartItem = action.payload
    })
    .addCase(createCart.fulfilled,(state,action)=>{
      state.status = ''
    })
    .addCase(createCart.pending, (state, action) => {
      state.status = action.meta.arg.accessories
      // state.CartItem = state.CartItem.map((item) => {
      //   if (item._id === action.meta.arg.accessories){
      //     state.status = true
      //   }
      //   return item
      // })
      // state.error = null;
    })
    .addCase(removeAllCartItem.fulfilled,(state,action)=>{
      // state.CartItem = action.payload
      state.CartItem = []
    })
    .addCase(removeCartItem.fulfilled,(state,action)=>{
      state.CartItem = state.CartItem.filter((item)=> item._id !== action.payload._id)
    })
  }
});

export default cartSlice.reducer;




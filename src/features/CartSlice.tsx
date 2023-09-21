// cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [] as CartItem[],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

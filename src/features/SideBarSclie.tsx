// cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [] as sideBar[],
};

const sideBar = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    addItemToSB: (state, action) => {
    //   state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum
      }, 0)

    },
    removeItemSB: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearSideBar: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToSB, removeItemSB, clearSideBar } = sideBar.actions;
export default sideBar.reducer;


interface sideBar {
  price: number;
  quantity: number;
}

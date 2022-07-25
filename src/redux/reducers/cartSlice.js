import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      findItem
        ? findItem.count++
        : state.items.push({ ...action.payload, count: 1 });
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum;
      }, 0);
    },
    removeItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count > 1) {
      console.log(findItem.count);
        findItem.count--;
      }
    },
    removeGroupItems: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice =  state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum;
      }, 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, removeGroupItems } =
  cartSlice.actions;

export default cartSlice.reducer;

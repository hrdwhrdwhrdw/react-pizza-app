import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface CartSliceType {
  totalPrice: number;
  totalCount: number;
  items: CartItemType[];
}

const initialState: CartSliceType = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state: CartSliceType, action: PayloadAction<CartItemType>) => {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload.id
      );

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
    removeItem: (state: CartSliceType, action: PayloadAction<number>) => {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload
      );
      if (findItem && findItem.count > 1) {
        findItem.count--;
      }
    },
    removeGroupItems: (
      state: CartSliceType,
      action: PayloadAction<CartItemType>
    ) => {
      state.items = state.items.filter(
        (obj: CartItemType) => obj.id !== action.payload.id
      );
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum;
      }, 0);
    },
    clearItems: (state: CartSliceType) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
}); 

export const { addItem, removeItem, clearItems, removeGroupItems } =
  cartSlice.actions;

export default cartSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import pizzaSlice  from "./pizza/pizzasSlice";
import filterSlice  from "./filter/filterSlice";
import cartSlice from "./cart/cartSlice";
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    pizzas: pizzaSlice,
    filter: filterSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

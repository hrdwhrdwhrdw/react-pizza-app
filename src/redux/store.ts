import { configureStore } from "@reduxjs/toolkit";
import pizzaSlice  from "./reducers/pizzasSlice";
import filterSlice  from "./reducers/filterSlice";
import cartSlice from "./reducers/cartSlice";
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

export const useAppDispatch = () => useDispatch<AppDispatch>()
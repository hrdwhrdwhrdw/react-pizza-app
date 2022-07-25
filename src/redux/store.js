import { configureStore } from "@reduxjs/toolkit";
import pizzaSlice  from "./reducers/pizzasSlice";
import filterSlice  from "./reducers/filterSlice";
import cartSlice from "./reducers/cartSlice";

export const store = configureStore({
  reducer: {
    pizzas: pizzaSlice,
    filter: filterSlice,
    cart: cartSlice,
  },
});


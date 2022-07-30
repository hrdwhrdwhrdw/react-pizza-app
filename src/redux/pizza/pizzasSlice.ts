import { fetchPizzasThunk } from "./../asyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import { PizzaSliceType, Status } from "./types";

const initialState: PizzaSliceType = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasThunk.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzasThunk.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzasThunk.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export default pizzaSlice.reducer;

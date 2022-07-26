import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzasThunk = createAsyncThunk(
  "pizzas/fetchPizzas",
  async ({ currentPage, sortBy, category, searchValue }) => {
    console.log(category);
    const { data } = await axios.get(
      `https://62dcc9254438813a261947b1.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${
        sortBy.type
      }&order=${sortBy.order}${category ? `&category=${category}` : "&category=0"}${
        searchValue ? `&search=${searchValue}` : ""
      }`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzasThunk.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzasThunk.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [fetchPizzasThunk.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setPizzas, setLoaded } = pizzaSlice.actions;

export default pizzaSlice.reducer;

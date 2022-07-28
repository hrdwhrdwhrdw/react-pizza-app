import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SortByType } from "./filterSlice";

export interface FetchPizzaType {
  category: number;
  sortBy: SortByType;
  currentPage: number;
  searchValue?: string;
}

export const fetchPizzasThunk = createAsyncThunk<PizzaItem[], FetchPizzaType>(
  "pizzas/fetchPizzas",
  async (params) => {
    const { currentPage, sortBy, category, searchValue } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://62dcc9254438813a261947b1.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${
        sortBy.type
      }&order=${sortBy.order}${category > 0 ? `&category=${category}` : ""}${
        searchValue ? `&search=${searchValue}` : ""
      }`
    );
    return data;
  }
);

export interface PizzaItem {
  id: number;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  count?: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
}

interface PizzaSliceType {
  items: PizzaItem[];
  status: Status;
}

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

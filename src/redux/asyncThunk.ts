import { createAsyncThunk } from '@reduxjs/toolkit';
import { PizzaItem, FetchPizzaType } from './pizza/types';
import axios from 'axios';
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
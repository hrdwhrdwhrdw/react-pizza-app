import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sortBy: {
    type: "popular",
    order: "desc",
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.category = Number(action.payload.category)
      state.currentPage = Number(action.payload.currentPage);
      state.sortBy.type = action.payload.sort;
      state.sortBy.order = action.payload.order;
    },
  },
});

export const { setSortBy, setCategory, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceType, SortNameType, SortType, OrderType, SortByType } from './types';

const initialState: FilterSliceType = {
  category: 0,
  sortBy: {
    name: SortNameType.POPULAR_DESC,
    type: SortType.POPULAR,
    order: OrderType.DESC,
  },
  currentPage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortBy: (state: FilterSliceType, action: PayloadAction<SortByType>) => {
      state.sortBy = action.payload;
    },
    setSearchValue: (state: FilterSliceType, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategory: (state: FilterSliceType, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setCurrentPage: (state: FilterSliceType, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (
      state: FilterSliceType,
      action: PayloadAction<FilterSliceType>
    ) => {
      state.category = action.payload.category;
      state.currentPage = action.payload.currentPage;
      state.sortBy = action.payload.sortBy;
    },
  },
});

export const {
  setSortBy,
  setCategory,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;

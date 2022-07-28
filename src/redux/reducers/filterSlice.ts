import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortNameType {
  POPULAR_DESC = "популярности (по убыванию)",
  POPULAR_ASC = "популярности (по возрастанию)",
  PRICE_DESC = "популярности (по убыванию)",
  PRICE_ASC = "популярности (по возрастанию)",
  ALPHABET_DESC = "популярности (по убыванию)",
  ALPHABET_ASC = "популярности (по возрастанию)"
}

export enum SortType {
  POPULAR = "popular",
  PRICE = "price",
  NAME = "name"
}

export enum OrderType {
  DESC = "desc",
  ASC ="asc"
}

export type SortByType = {
  name?: SortNameType;
  type?: SortType;
  order?: OrderType;
};

export interface FilterSliceType {
  category: number;
  sortBy: SortByType;
  currentPage: number;
  searchValue?: string;
}

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
    setFilters: (state: FilterSliceType, action: PayloadAction<FilterSliceType>) => {
      state.category = Number(action.payload.category);
      state.currentPage = Number(action.payload.currentPage);
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

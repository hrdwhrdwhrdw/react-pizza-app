const initialState = {
  category: 0,
  sortBy: {
    type: "popular",
    order: "desc",
  },
  currentPage: 1,
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SORT_BUY":
      return { ...state, sortBy: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_FILTERS":
      return {
        ...state,
        category: Number(action.payload.category),
        currentPage: Number(action.payload.currentPage),
        sortBy: {
          type: action.payload.sort,
          order: action.payload.order,
        },
      };

    default:
      return state;
  }
};

export default filters;

// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   category: null,
//   sortBy: {
//     type: "popular",
//     order: "desc",
//   },
//   currentPage: 1
// };

// export const filterSlice = createSlice({
//   name: 'filter',
//   initialState,
//   reducers: {
//     setSortBy: (state, action) => {
//       state.sortBy = action.payload
//     },
//     setCategory: (state, action) => {
//       state.category = action.payload
//     },
//     setCurrentPage: (state, action) => {
//       state.currentPage = action.payload
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { setSortBy, setCategory, setCurrentPage } = filterSlice.actions

// export default filterSlice.reducer

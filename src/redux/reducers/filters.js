const initialState = {
  category: 0,
  sortBy: "popular",
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SORT_BUY":
      return { ...state, sortBuy: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };

    default:
      return state;
  }
};

export default filtersReducer;

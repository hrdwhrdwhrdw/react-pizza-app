const initialState = {
  category: null,
  sortBy: {
    type: "popular",
    order: "desc"
  },
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SORT_BUY":
      return { ...state, sortBy: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };

    default:
      return state;
  }
};

export default filters;

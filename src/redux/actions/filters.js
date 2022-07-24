const setSortBy = ({ type, order }) => ({
  type: "SET_SORT_BUY",
  payload: { type, order },
});

const setCategory = (catIndex) => ({
  type: "SET_CATEGORY",
  payload: catIndex,
});
const setCurrentPage = (currentPage) => ({
  type: "SET_CURRENT_PAGE",
  payload: currentPage,
});
const setFilters = ({ category, currentPage, sort, order }) => ({
  type: "SET_FILTERS",
  payload: { category, currentPage, sort, order },
});

export { setSortBy, setCategory, setCurrentPage, setFilters };

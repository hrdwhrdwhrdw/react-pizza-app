const setSortBy = (name) => ({
  type: "SET_SORT_BUY",
  payload: name,
});

const setCategory = (catIndex) => ({
  type: "SET_CATEGORY",
  payload: catIndex,
});

export { setSortBy, setCategory };

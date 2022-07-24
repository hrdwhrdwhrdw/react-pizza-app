import axios from "axios";

export const setLoaded = (payload) => ({
  type: "SET_LOADED",
  payload,
});

const fetchPizzas =
  (category, sortBy, searchValue, currentPage) => (dispatch) => {
    dispatch(setLoaded(true));
    axios
      .get(
        `https://62dcc9254438813a261947b1.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${
          sortBy.type
        }&order=${sortBy.order}${
          category !== null ? `&category=${category}` : ""
        }${searchValue ? `&search=${searchValue}` : ""}`
      )
      .then(({ data }) => {
        dispatch(setPizzas(data));
        dispatch(setLoaded(false));
      });
  };

const setPizzas = (items) => ({
  type: "SET_PIZZAS",
  payload: items,
});

export { setPizzas, fetchPizzas };

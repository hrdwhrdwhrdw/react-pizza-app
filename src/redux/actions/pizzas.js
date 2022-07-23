import axios from "axios";

export const setLoaded = (payload) => ({
  type: "SET_LOADED",
  payload,
});

const fetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setLoaded(false));
  axios
    .get(
      `/pizzas?${
        category !== null ? `category=${category}` : ""
      }&_sort=${sortBy.type}&_order=${sortBy.order}`
    )
    .then(({ data }) => {
      dispatch(setPizzas(data));
    });
};

const setPizzas = (items) => ({
  type: "SET_PIZZAS",
  payload: items,
});

export { setPizzas, fetchPizzas };

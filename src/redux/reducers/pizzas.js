const initialState = {
  items: [],
  isLoading: false,
};

const pizzas = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PIZZAS":
      return { ...state, items: action.payload };

    case "SET_LOADED":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default pizzas;

// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   value: 0,
// }

// export const pizzaSlice = createSlice({
//   name: 'pizzas',
//   initialState,
//   reducers: {
//     setPizzas: (state, action) => {
//       state.items = action.payload
//     },
//     setLoaded: (state, action) => {
//       state.isLoading = action.payload
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { setPizzas, setLoaded } = pizzaSlice.actions

// export default pizzaSlice.reducer
